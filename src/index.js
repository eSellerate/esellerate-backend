import app from './app.js'
// library to load environment variables from a .env file
import 'dotenv/config'

app.listen(3000 || process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
