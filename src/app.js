import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import { sequelize } from './database/database.js'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import 'dotenv/config'
// import router from './routes/routes.js'

const app = express()

// cors middleware
app.use(cors())

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
