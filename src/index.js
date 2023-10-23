import app from './app.js'
import { sequelize } from './database/database.js'
// library to load environment variables from a .env file
import 'dotenv/config'

// import './models/User.js'

async function main () {
  try {
    await sequelize.sync({ force: false })
    app.listen(3000 || process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log('Error connecting to database: ', error)
  }
}

main()
