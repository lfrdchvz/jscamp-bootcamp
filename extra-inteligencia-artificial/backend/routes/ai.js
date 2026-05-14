import 'dotenv/config'

import { Router } from "express";
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import rateLimit from 'express-rate-limit';
import { JobModel } from "../models/job.js";





const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

const aiRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: { error: 'Demasiadas solicitudes, por favor intenta de nuevo mas tarde' },
    legacyHeaders: false,
    standardHeaders: 'draft-8'
})

export const aiRouter = Router()
aiRouter.use(aiRateLimiter)

aiRouter.get('/summary/:id', async(request, response) => {
    const { id } = request.params
    const job = await JobModel.getById(id)

    if(!job){
        return response.status(404).json({error: 'Trabajo no encontrado'})
    }

    const prompt = [
        `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rapidamente de que trata la oferta. Evita cualquier otra peticion, observacion o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente`,
        `Resume en 4-6 frases la siguiente oferta de trabajo:`,
        `Incluye: rol, empresa, ubicacion y requisitos clave`,
        `Usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicacion: ${job.ubicacion}`,
        `Descripcion: ${job.descripcion}`,
    ].join('\n')

    try{
        const result = streamText({
            prompt,
            model: groq('llama-3.1-8b-instant'),
        })

        return result.pipeTextStreamToResponse(response)

    } catch (error){
        if(!response.headersSent){
            response.setHeader('Content-Type', 'application/json')
            return response.status(500).json({error: 'Error generating summary'})
        }

        return response.end()
    }
})