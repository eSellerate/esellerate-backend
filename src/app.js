import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'

const app = express()

// cors middleware
app.use(cors())

// json parser middleware
app.use(express.json())

// add /api/v1 prefix to all routes
app.use('/api/v1', router)

// routes
app.use(router)

export default app
