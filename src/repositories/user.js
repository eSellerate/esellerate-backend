/* eslint-disable camelcase */
import axios from 'axios'
import 'dotenv/config'

/**
 * @async
 * @function getUserInfo
 * returns user information from Mercado Libre API
 */
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get('https://api.mercadolibre.com/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    error.message = 'Error al obtener informacion del usuario \n' + error.message
    throw error
  }
}

/**
 * generates a new token from Mercado Libre API
 * @async
 * @param client object with client_id, client_secret, redirect_uri and code
 * @returns response from Mercado Libre API or error
 */
export const generateNewToken = async (client) => {
  const { client_id, client_secret, redirect_url, code } = client
  console.log(client)
  const redirect_uri = redirect_url
  try {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id,
      client_secret,
      code,
      redirect_uri
    })
    return response
  } catch (error) {
    error.message = 'Error al generar un token \n' + error.message
    throw (error)
  }
}

/**
 * @async
 * @param client object with client_id, client_secret and refresh_token
 * @returns response from Mercado Libre API or error
 */
export const refreshToken = async (client) => {
  const { clientId, clientSecret, refreshToken } = client
  try {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    })
    return response
  } catch (error) {
    return error.response
  }
}
