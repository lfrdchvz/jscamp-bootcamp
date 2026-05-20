import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server
const PORT = 5678
const BASE_URL = `http://localhost:${PORT}`

// Buenisimo! Luego en uno de los ejemplos de petición voy a plantear una manera diferente de hacerlo para traer de manera siempre consistente un ID que exista
const VALID_ID = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'
const ID_PARA_PATCH_Y_DELETE = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'
const INVALID_ID = 'id-que-no-existe'

before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve())
        server.on('error', reject)
    })
})

after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err)
            resolve()
        })
    })
})

describe('GET /jobs', () => {
    test('debe responder con 200 y un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'json.data debe ser un array')
    })

    test('debe filtrar trabajos por tecnología', async () => {
        const tech = 'react'
        const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.technology.includes(tech)),
            `Todos los trabajos deben incluir la tecnología ${tech}`
        )
    })

    test('debe respetar el límite de resultados', async () => {
        // Una observación mínima, si el límite es 2 y se repite muchas veces, lo podemos pasar a una constante
        const LIMIT = 2
        const response = await fetch(`${BASE_URL}/jobs?limit=${LIMIT}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        // Muy bien testeando estas dos propiedades
        assert.strictEqual(json.limit, LIMIT)
        assert.strictEqual(json.data.length, LIMIT)
    })

    test('debe aplicar offset correctamente', async () => {
        const response = await fetch(`${BASE_URL}/jobs?offset=1`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.strictEqual(json.data[0].id, VALID_ID, 'El primer resultado debe ser el segundo job del JSON')

        // También podemos validad con un offset superior a 1:
        const offset = 2
        // 1. Obtenemos los jobs y verificamos status
        const responseWithOffset = await fetch(`${BASE_URL}/jobs?offset=${offset}`)
        assert.strictEqual(responseWithOffset.status, 200)

        // 2. Guardamos el primer resultado con el offset=2
        const jsonWithOffset = await responseWithOffset.json()
        const firstJobWithOffset = jsonWithOffset.data[0]

        // 3. Obtenemos todos los jobs y verificamos el status
        const responseAll = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(responseAll.status, 200)

        // 4. Guardamos el job que está en la posición 3 -> que debería ser el primero con offset=2
        const jsonAll = await responseAll.json()
        const firstJobAll = jsonAll.data[2]
       
        // 5. Verificamos que el primer job con offset=2 es el mismo que el tercero sin offset
        assert.strictEqual(firstJobWithOffset.id, firstJobAll.id, 'El primer resultado con offset=2 debe ser el tercer job del JSON')
    })
})

describe('GET /jobs/:id', () => {
    test('debe devolver el trabajo con el ID especificado', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${VALID_ID}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.strictEqual(json.id, VALID_ID)

        // Otra cosa que podemos hacer es obtener un id real de la lista de jobs
        // RECUERDA: Esto es una alternativa, lo que hiciste está genial :) Y en muchos casos debería ser así para evitar tantas peticiones

        // 1. Obtenemos los jobs
        const responseAll = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(responseAll.status, 200)
        const jsonAll = await responseAll.json()

        // 2. Obtenemos el id del primer job
        const firstJobAllId = jsonAll.data[0].id

        // 3. Obtenemos el job con ese id
        const responseById = await fetch(`${BASE_URL}/jobs/${firstJobAllId}`)

        // 4. Verificamos que existe (esto nos da una pista de que el job es correcto)
        assert.strictEqual(responseById.status, 200)

        // 5. Comparamos el `id` de ambos jobs para ver que es correcto
        const jsonById = await responseById.json()
        assert.strictEqual(jsonById.id, firstJobAllId)
    })

    test('debe responder con 404 cuando el ID no existe', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${INVALID_ID}`)
        assert.strictEqual(response.status, 404)

        const json = await response.json()
        assert.ok(json.message, 'La respuesta debe contener un campo message')
    })
})

describe('POST /jobs', () => {
    test('debe crear un nuevo trabajo y responder con 201', async () => {
        const newJob = {
            titulo: 'Frontend Developer',
            empresa: 'Test Company',
            ubicacion: 'Remoto',
            data: {
                technology: ['react', 'javascript'],
                modalidad: 'remoto',
                nivel: 'junior',
                contrato: 'jornada-completa'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJob)
        })

        assert.strictEqual(response.status, 201)

        const json = await response.json()
        // Excelente validad que el `id` exista!
        assert.ok(json.id, 'El trabajo creado debe tener un id')
        assert.strictEqual(json.titulo, newJob.titulo)
        assert.strictEqual(json.empresa, newJob.empresa)
    })

    test('debe responder con 400 si el título tiene menos de 3 caracteres', async () => {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: 'ab', empresa: 'Test', ubicacion: 'Remoto', data: {} })
        })
        assert.strictEqual(response.status, 400)
    })

    test('debe responder con 400 si el título tiene más de 100 caracteres', async () => {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: 'a'.repeat(101), empresa: 'Test', ubicacion: 'Remoto', data: {} })
        })
        assert.strictEqual(response.status, 400)
    })

    test('debe responder con 400 si falta el campo título', async () => {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ empresa: 'Test', ubicacion: 'Remoto', data: {} })
        })
        assert.strictEqual(response.status, 400)
    })

    test('debe responder con 400 si el título no es un string', async () => {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: 123, empresa: 'Test', ubicacion: 'Remoto', data: {} })
        })
        assert.strictEqual(response.status, 400)
    })

    test('debe responder con 201 si falta el campo descripción (es opcional)', async () => {
        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: 'Job sin descripción',
                empresa: 'Test Company',
                ubicacion: 'Remoto',
                data: {
                    technology: ['javascript'],
                    modalidad: 'remoto',
                    nivel: 'junior',
                    contrato: 'jornada-completa'
                }
            })
        })
        assert.strictEqual(response.status, 201)
    })
})

describe('PUT /jobs/:id', () => {
    test('debe actualizar el trabajo y responder con 200', async () => {
        const updatedJob = {
            titulo: 'Puesto Actualizado PUT',
            empresa: 'Empresa Actualizada',
            ubicacion: 'Presencial',
            data: {
                technology: ['node'],
                modalidad: 'remoto',
                nivel: 'senior',
                contrato: 'jornada-completa'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs/${VALID_ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedJob)
        })
        assert.strictEqual(response.status, 200)

        const getResponse = await fetch(`${BASE_URL}/jobs/${VALID_ID}`)
        const json = await getResponse.json()
        assert.strictEqual(json.titulo, updatedJob.titulo)
        assert.strictEqual(json.empresa, updatedJob.empresa)
    })

    test('debe responder con 404 cuando el ID no existe', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${INVALID_ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: 'Test',
                empresa: 'Test',
                ubicacion: 'Test',
                data: { technology: ['javascript'], modalidad: 'remoto', nivel: 'junior', contrato: 'jornada-completa' }
            })
        })
        assert.strictEqual(response.status, 404)
    })
})

describe('PATCH /jobs/:id', () => {
    test('debe actualizar solo los campos enviados y responder con 200', async () => {
        const patch = { titulo: 'Titulo Parcheado', ubicacion: 'Barcelona' }

        const response = await fetch(`${BASE_URL}/jobs/${ID_PARA_PATCH_Y_DELETE}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patch)
        })
        assert.strictEqual(response.status, 200)

        const getResponse = await fetch(`${BASE_URL}/jobs/${ID_PARA_PATCH_Y_DELETE}`)
        const json = await getResponse.json()
        assert.strictEqual(json.titulo, patch.titulo)
        assert.strictEqual(json.ubicacion, patch.ubicacion)
        assert.ok(json.empresa, 'El campo empresa debe seguir existiendo')
    })

    test('debe responder con 404 cuando el ID no existe', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${INVALID_ID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: 'Test' })
        })
        assert.strictEqual(response.status, 404)
    })
})

describe('DELETE /jobs/:id', () => {
    test('debe eliminar el trabajo y responder con 204', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${ID_PARA_PATCH_Y_DELETE}`, {
            method: 'DELETE'
        })
        assert.strictEqual(response.status, 204)

        const getResponse = await fetch(`${BASE_URL}/jobs/${ID_PARA_PATCH_Y_DELETE}`)
        assert.strictEqual(getResponse.status, 404)
    })

    test('debe responder con 404 cuando el ID no existe', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${INVALID_ID}`, {
            method: 'DELETE'
        })
        assert.strictEqual(response.status, 404)
    })
})