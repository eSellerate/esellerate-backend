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
import schedule from 'node-schedule'
import { automaticMessages } from './automatization.js'
// import router from './routes/routes.js'

const app = express()

// multiparty
global.__dirname = dirname(fileURLToPath(import.meta.url))
const storeImagesPath = path.join(global.__dirname, 'public', 'uploads')
app.use(multipart({ uploadDir: storeImagesPath }))

// static files
console.log(global.__dirname)
app.use(express.static(path.join(global.__dirname, 'public')))

app.use(cookieParser())

// cors middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://162.243.186.254:5173',
    'http://162.243.186.254:5174',
    'http://esellerate.com.mx:5173',
    'http://esellerate.com.mx',
    'https://esellerate.com.mx',
    'https://162.243.186.254:3000',
    'https://esellerate.com.mx:5173'
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

//1 es el intervalo de minutos en los que se ejecuta
const job = schedule.scheduleJob("*/10 * * * * *", function(){
  console.log('Ejecutando Mensajes Automaticos!');
  automaticMessages(new Date())
});

export default app
