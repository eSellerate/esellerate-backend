import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import { sequelize } from './database/database.js'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'node:path'
import multipart from 'connect-multiparty'
import 'dotenv/config'
// import router from './routes/routes.js'

const app = express()

// multiparty
const __dirname = dirname(fileURLToPath(import.meta.url))
const storeImagesPath = path.join(__dirname, 'public', 'uploads')
app.use(multipart({ uploadDir: storeImagesPath }))

// static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser())

// cors middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  exposedHeaders: ['Cookie']
}))

// json parser middleware
app.use(express.json())

const Store = SequelizeStore(session.Store)

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new Store({
    checkExpirationInterval: 6 * 60 * 60 * 1000, // six hours
    expiration: 6 * 60 * 60 * 1000, // six hours
    db: sequelize
  }),
  cookie: {
    maxAge: 6 * 60 * 60 * 1000 // six hours
  },
  resave: false,
  saveUninitialized: false
}))

// add /api/v1 prefix to all routes
app.use('/api/v1', router)

// routes
app.use(router)

export default app
