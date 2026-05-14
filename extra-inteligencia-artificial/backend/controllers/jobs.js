import { JobModel } from "../models/job.js"
import { DEFAULTS } from "../config.js"

export class JobController {
    static async getAll(request, response){
        const { text, nivel, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = request.query
    
        const result = await JobModel.getAll({ text, nivel, technology, limit, offset })
    
        return response.json({
            data: result,
            total: result.length,
            limit: Number(limit),
            offset: Number(offset)
        })
    }

    static async getId(request, response){
        const { id } = request.params
        const job = await JobModel.getById(id)

        if (!job) {
            return response.status(404).json({ message: 'Empleo no encontrado' })
        }

        return response.json(job)
    }

    static async create(request, response){
        const { titulo, empresa, ubicacion, data } = request.body
        const newJob = await JobModel.create({ titulo, empresa, ubicacion, data })
        return response.status(201).json(newJob)
    }

    static async update(request, response){
        const { id } = request.params
        const updatedJob = await JobModel.update(id, request.body)
        if (!updatedJob) return response.status(404).json({ message: 'Empleo no encontrado' })
        return response.json(updatedJob)
    }

    static async partialUpdate(request, response){
        const { id } = request.params
        const updatedJob = await JobModel.partialUpdate(id, request.body)
        if (!updatedJob) return response.status(404).json({ message: 'Empleo no encontrado' })
        return response.json(updatedJob)
    }

    static async delete(request, response){
        const { id } = request.params
        const deleted = await JobModel.delete(id)
        if (!deleted) return response.status(404).json({ message: 'Empleo no encontrado' })
        return response.status(204).send()
    }
}