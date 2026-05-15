import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
// Con esto podemos trabajar con JSON desde streams
import { json } from 'node:stream/consumers';

process.loadEnvFile()

const port = process.env.PORT || 3000

const users = [
  { 
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Miguel',
    age: 28 
  },

  { 
    id: 'f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b',
    name: 'Mateo', 
    age: 34 
  },

  { 
    id: '9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d',
    name: 'Pablo', 
    age: 22 
  },

  { 
    id: '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f',
    name: 'Lucía', 
    age: 31 
  },

  { 
    id: '7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e',
    name: 'Ana',   
    age: 26 
  },

  { 
    id: '5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a',
    name: 'Juan',  
    age: 29 
  },

  { 
    id: '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
    name: 'Sofía', 
    age: 25 
  },

  { 
    id: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
    name: 'Carlos',
    age: 37 
  },

  { 
    id: '4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f',
    name: 'Elena', 
    age: 23 
  },

  { 
    id: '0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b',
    name: 'Diego', 
    age: 30 
  },

]


// Con la importación que hicimos, no hace falta esto
/* const json = (req) => new Promise((resolve) => {
  let body = ''
  req.on('data', (chunk) => { body += chunk })
  req.on('end', () => { resolve(JSON.parse(body)) })
}) */

// La consigna especificaba crear este helper, para poder responder con JSON sin tener que replicarlo en cada sitio
const sendJson = function(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(data));
}
  
const server = createServer(async (req, res) => {

  const { pathname, searchParams } = new URL(req.url, `http://localhost:${port}`)

  // ===========
  // EJERCICIO 3
  // ===========
  if (req.method === 'GET' && pathname === '/health') {
    // Lo podemos usar de esta manera
    return sendJson(res, 200, {
      status: 'ok',
      uptime: process.uptime()
    })
  }

  // ===============
  // EJERCICIO 1 y 5
  // ===============
  if (req.method === 'GET' && pathname === '/users') {

    const nameFilter   = searchParams.get('name')
    const minAgeFilter = searchParams.get('minAge')
    const maxAgeFilter = searchParams.get('maxAge')
    const limitFilter  = searchParams.get('limit')
    const offsetFilter = searchParams.get('offset')

    let filteredUsers = [...users]

    if (nameFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    }

    if (minAgeFilter) {      
      // Podemos hacer más validaciones
      const isInvalidAge = Number.isNaN(Number(minAgeFilter)) || Number(minAgeFilter) < 0

      if(isInvalidAge) {
        return sendJson(res, 400, { error: 'Invalid age filter' })
      }

      filteredUsers = filteredUsers.filter(user =>
        user.age >= Number(minAgeFilter)
      )
    }

    if (maxAgeFilter) {
      // Podemos hacer más validaciones
      const isInvalidAge = Number.isNaN(Number(maxAgeFilter)) || Number(maxAgeFilter) < 0

      if(isInvalidAge) {
        return sendJson(res, 400, { error: 'Invalid age filter' })
      }

      filteredUsers = filteredUsers.filter(user =>
        user.age <= Number(maxAgeFilter)
      )
    }

    if (limitFilter && offsetFilter) {
      // Redondeamos para evitar problemas con decimales, si el usuario ingresa uno
      const limit  = Math.floor(Number(limitFilter))
      const offset = Math.floor(Number(offsetFilter))

      // Validamos que el offset no sea negativo
      if (offset < 0) {
        return sendJson(res, 400, { error: 'Invalid offset filter' })
      }

      // Validamos que el limit no sea negativo
      if (limit < 0) {
        return sendJson(res, 400, { error: 'Invalid limit filter' })
      }

      filteredUsers = filteredUsers.slice(offset, offset + limit)
    }

    // Lo podemos enviar así
    return sendJson(res, 200, filteredUsers)
  }

  // ===========
  // EJERCICIO 2
  // ===========
  if (req.method === 'POST' && pathname === '/users') {
    const { name, age } = await json(req)

    const newUser = {
      id:   randomUUID(),
      name,
      age
    }

    users.push(newUser)

    return sendJson(res, 201, newUser)
  }

  // ===========
  // EJERCICIO 4
  // ===========
  return sendJson(res, 404, { error: 'Ruta no encontrada' })
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})