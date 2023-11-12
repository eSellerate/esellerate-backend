import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import { sequelize } from './database/database.js'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
// import router from './routes/routes.js'

const app = express()

app.use(cookieParser())

// cors middleware
app.use(cors({
  origin: ['http://localhost:5173'],
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
