import axios from 'axios'
import 'dotenv/config'

/**
 * @async
 * @function getUserInfo
 * returns user information from Mercado Libre API
 */
export const getUserInfo = async (token) => {
  return await axios.get('https://api.mercadolibre.com/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

/**
 * @async
 * @param {*} client object with client_id, client_secret and refresh_token
 * @returns Prommise with new access_token
 */
export const refreshToken = async (client) => {
  const { clientId, clientSecret, refreshToken } = client
  return await axios.post('https://api.mercadolibre.com/oauth/token', {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken
  })
}
