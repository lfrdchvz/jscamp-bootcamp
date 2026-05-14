import express, { json, request, response } from 'express'
import cors from 'cors'

import { DEFAULTS } from './config.js'
import jobsData from './jobs.json' with { type: 'json' }

const jobs = Array.isArray(jobsData) ? jobsData : jobsData.data

if (process.env.NODE_ENV !== 'production') {
    process.loadEnvFile()
}

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
    'https://midu.dev',
    'http://localhost:3000',
    'https://07-ejercicio-api-rest-con-express-y.vercel.app',
    null
]

app.use(
    cors({
        origin: (origin, callback) => {
            if(!origin || ACCEPTED_ORIGINS.includes(origin)){
                return callback(null, true)
            }
            return callback(new Error('Origen no permitido'))
        }
    })
)

app.use(express.json())

app.use((request, response, next) => {
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}] ${request.method} ${request.url}`)
    next()
})

app.get('/', (request, response) =>{
    response.send('Hello World!')
})

// CRUD: Create, Read, Update, Delete

app.get('/jobs', (request, response) => {
    const { text, nivel, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = request.query

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

    return response.json(paginatedJobs)
})

// idempotencia: porque el sistema queda igual si llamas varias veces

app.get('/jobs/:id', (request, response) => {
    const { id } = request.params

    const job = jobs.find(job => job.id === id)

    if (!job) {
        return response.status(404).json({ message: 'Empleo no encontrado' })
    }

    return response.json(job)
})

// NO es idempotente, porque se crea un nuevo recurso
app.post('/jobs', (request, response) => {
    const { titulo, empresa, ubicacion, data } = request.body

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data
    }

    jobs.push(newJob)

    return response.status(201).json(newJob)
})

// Reemplazar un recurso completo
app.put('/jobs/:id', (request, response) => {
    const { id } = request.params
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) {
        return response.status(404).json({ message: 'Empleo no encontrado' })
    }

    const updatedJob = { ...request.body, id }
    jobs[jobIndex] = updatedJob

    return response.json(updatedJob)
})

// Actualizar parcialmente un recurso
app.patch('/jobs/:id', (request, response) => {
    const { id } = request.params
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) {
        return response.status(404).json({ message: 'Empleo no encontrado' })
    }

    const updatedJob = { ...jobs[jobIndex], ...request.body }
    jobs[jobIndex] = updatedJob

    return response.json(updatedJob)
})

app.delete('/jobs/:id', (request, response) => {
    const { id } = request.params
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) {
        return response.status(404).json({ message: 'Empleo no encontrado' })
    }

    jobs.splice(jobIndex, 1)

    return response.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})