/* eslint-disable camelcase */
// model
import User from '../models/User.js'
import MercadolibreAuth from '../models/MercadoLibreAuth.js'
import MercadolibreApp from '../models/MercadolibreApp.js'

/**
 * retrieves the MercadoLibre values from specified user
 * @param userId  user id
 * @returns Object with MercadoLibre values
 */
export async function GetMercadoLibreAuthValues (userId) {
  const user = await User.findOne({
    where: {
      id: userId
    },
    include: {
      model: MercadolibreAuth
    }
  })
  if (!user) {
    return null
  }
  if (!user.dataValues.mercadolibre_auth) {
    return null
  }
  return user.dataValues.mercadolibre_auth.dataValues
}

export async function GetMercadoLibreAppValues (clientId) {
  const mlApp = await MercadolibreApp.findOne({
    where: {
      client_id: clientId
    }
  })
  if (!mlApp) {
    return null
  }
  return mlApp.dataValues
}

export async function SetMercadoLibreAuthValues (userId, values) {
  const mercadoLibreAuth = await MercadolibreAuth.findOne({
    where: {
      id: userId
    }
  })
  mercadoLibreAuth.personal_token = values.access_token
  mercadoLibreAuth.refresh_token = values.refresh_token
  mercadoLibreAuth.save()
}
