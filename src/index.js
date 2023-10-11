import app from './app.js'
import { sequelize } from './database/database.js'
// library to load environment variables from a .env file
import 'dotenv/config'

import './models/User.js'
import './models/Product.js'
import './models/ProductImages.js'

async function main () {
  try {
    await sequelize.sync({ force: true })
    app.listen(3000 || process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log('Error connecting to database: ', error)
  }
}

main()
