import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
    'https://midu.dev',
    'http://localhost:3000',
    'https://07-ejercicio-api-rest-con-express-y.vercel.app',
    null 
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            // Si no hay origin (petición directa desde navegador o curl) se permite
            if (!origin || acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }
            return callback(new Error('Origen no permitido'))
        }
    })
}
