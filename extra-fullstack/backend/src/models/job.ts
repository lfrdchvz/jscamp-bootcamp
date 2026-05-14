import { db } from '../db/database.js'
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from "../types.js"

export class JobModel {

  static async getAll(filters?: JobFilters & { limit?: number, offset?: number }): Promise<{ data: Job[], total: number }> {
    let query = `
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      JOIN job_technologies jt ON j.id = jt.job_id
    `
    let countQuery = `SELECT COUNT(DISTINCT j.id) as total FROM jobs j JOIN job_technologies jt ON j.id = jt.job_id`

    const conditions: string[] = []
    const params: unknown[] = []

    if (filters?.tech) {
      conditions.push(`j.id IN (SELECT job_id FROM job_technologies WHERE technology = ?)`)
      params.push(filters.tech)
    }
    if (filters?.modality) {
      conditions.push(`j.modality = ?`)
      params.push(filters.modality)
    }
    if (filters?.level) {
      conditions.push(`j.level = ?`)
      params.push(filters.level)
    }

    if (conditions.length > 0) {
      const where = ' WHERE ' + conditions.join(' AND ')
      query += where
      countQuery += where
    }

    query += ' GROUP BY j.id'

    const limit = filters?.limit ?? 4
    const offset = filters?.offset ?? 0
    query += ` LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const rows = db.prepare(query).all(...params) as any[]
    const { total } = db.prepare(countQuery).get(...params.slice(0, -2)) as any

    const data = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      description: row.description,
      data: {
        technology: row.technologies.split(','),
        modality: row.modality,
        level: row.level
      }
    }))

    return { data, total }
  }

  static async getById(id: string): Promise<Job | undefined> {
    const row = db.prepare(`
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies,
        jc.description AS content_description,
        jc.responsibilities,
        jc.requirements,
        jc.about
      FROM jobs j
      JOIN job_technologies jt ON j.id = jt.job_id
      LEFT JOIN job_content jc ON j.id = jc.job_id
      WHERE j.id = ?
      GROUP BY j.id
    `).get(id) as any

    if (!row) return undefined

    return {
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      description: row.description,
      data: {
        technology: row.technologies.split(','),
        modality: row.modality,
        level: row.level
      },
      content: {
        description: row.content_description ?? '',
        responsibilities: row.responsibilities ?? '',
        requirements: row.requirements ?? '',
        about: row.about ?? ''
      }
    }
  }

  static async create(input: any): Promise<Job> {
    const id = crypto.randomUUID()

    db.prepare(`
      INSERT INTO jobs (id, title, company, location, description, modality, level)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, input.title, input.company, input.location, input.description, input.data.modality, input.data.level)

    for (const tech of input.data.technology) {
      db.prepare(`INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`).run(id, tech)
    }

    db.prepare(`
      INSERT INTO job_content (job_id, description, responsibilities, requirements, about)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      id,
      input.content?.description ?? '',
      input.content?.responsibilities ?? '',
      input.content?.requirements ?? '',
      input.content?.about ?? ''
    )

    return { id, ...input }
  }

  static async delete(id: string): Promise<boolean> {
    db.prepare(`DELETE FROM job_technologies WHERE job_id = ?`).run(id)
    db.prepare(`DELETE FROM job_content WHERE job_id = ?`).run(id)
    const result = db.prepare(`DELETE FROM jobs WHERE id = ?`).run(id)
    return result.changes > 0
  }

  static async update(id: string, input: any): Promise<Job | null> {
    const existing = await JobModel.getById(id)
    if (!existing) return null

    const updated = {
      ...existing,
      ...input,
      data: input.data ? { ...existing.data, ...input.data } : existing.data,
      content: input.content ? { ...existing.content, ...input.content } : existing.content
    }

    db.prepare(`
      UPDATE jobs SET title = ?, company = ?, location = ?, description = ?, modality = ?, level = ?
      WHERE id = ?
    `).run(updated.title, updated.company, updated.location, updated.description, updated.data.modality, updated.data.level, id)

    if (input.data?.technology) {
      db.prepare(`DELETE FROM job_technologies WHERE job_id = ?`).run(id)
      for (const tech of input.data.technology) {
        db.prepare(`INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`).run(id, tech)
      }
    }

    if (input.content) {
      db.prepare(`
        INSERT INTO job_content (job_id, description, responsibilities, requirements, about)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(job_id) DO UPDATE SET
          description = excluded.description,
          responsibilities = excluded.responsibilities,
          requirements = excluded.requirements,
          about = excluded.about
      `).run(id, updated.content.description, updated.content.responsibilities, updated.content.requirements, updated.content.about)
    }

    return updated
  }
}