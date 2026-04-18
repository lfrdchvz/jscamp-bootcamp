import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jobs = JSON.parse(readFileSync(join(__dirname, '../jobs.json'), 'utf-8'))

export class JobModel {
    static async getAll({ text, nivel, technology, limit = 10, offset = 0}){

        let filteredJobs = [...jobs]

        if (text) {
            const searchTerm = text.toLowerCase()
            filteredJobs = filteredJobs.filter(job =>
                job.titulo.toLowerCase().includes(searchTerm) ||
                job.descripcion.toLowerCase().includes(searchTerm)
            )
        }

        if (nivel) {
            filteredJobs = filteredJobs.filter(job =>
                job.data.nivel === nivel.toLowerCase()
            )
        }

        if (technology) {
            filteredJobs = filteredJobs.filter(job =>
                job.data.technology.includes(technology.toLowerCase())
            )
        }

        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

        return paginatedJobs
    }

    static async getById(id){
        const job = jobs.find(job => job.id === id)
        return job
    }

    static async create({ titulo, empresa, ubicacion, data }){
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data
        }
        jobs.push(newJob)
        return newJob
    }

    static async update(id, body){
        const jobIndex = jobs.findIndex(job => job.id === id)
        if (jobIndex === -1) return null

        const updatedJob = { ...body, id }
        jobs[jobIndex] = updatedJob
        return updatedJob
    }

    static async partialUpdate(id, body){
        const jobIndex = jobs.findIndex(job => job.id === id)
        if (jobIndex === -1) return null

        const updatedJob = { ...jobs[jobIndex], ...body }
        jobs[jobIndex] = updatedJob
        return updatedJob
    }

    static async delete(id){
        const jobIndex = jobs.findIndex(job => job.id === id)
        if (jobIndex === -1) return null

        jobs.splice(jobIndex, 1)
        return true
    }
}