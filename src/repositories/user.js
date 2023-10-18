import axios from 'axios'
import 'dotenv/config'

/**
 * @async
 * @function getUserInfo
 * returns user information from Mercado Libre API
 */
export const getUserInfo = async () => {
  return await axios.get('https://api.mercadolibre.com/users/me', {
    headers: {
      Authorization: process.env.TOKEN
    }
  })
}
