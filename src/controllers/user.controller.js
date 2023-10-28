/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import MercadolibreApp from '../models/MercadolibreApp.js'

// repositories
import { refreshToken as generateNewToken } from '../repositories/user.js'
import { validationResult } from 'express-validator'

export const login = async (req, res) => {
  // validate request data
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Ocurrió un error al iniciar sesión',
      errors: errors.array()
    })
    return
  }
  // get email and password from request body
  const { username, email, password } = req.body
  // find user by email
  const user = await User.findOne({
    where: {
      email
    },
    include: {
      model: MercadolibreApp
    }
  })
  // check if password is correct (add bcrypt)
  if (user.password !== password) {
    res.status(401).json({
      message: 'El usuario o la contraseña son incorrectos'
    })
    return
  }
  // destructuring mercadolibre app data
  const { client_id, client_secret, refresh_token } = user.dataValues.mercadolibre_app
  if (client_id === '0') { // check if user has a mercado libre app associated
    res.status(200).json({
      message: 'El usuario no tiene una aplicación de Mercado Libre asociada',
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email,
        firstName: user.dataValues.first_name,
        lastName: user.dataValues.last_name,
        photoUrl: user.dataValues.photo_url
      }
    })
    return
  }
  // try to generate new token
  const response = await generateNewToken({
    clientId: client_id,
    clientSecret: client_secret,
    refreshToken: refresh_token
  })
  // check if new token was generated
  console.log(response)
  res.status(200).json({})
}

export const addMercadoLibreApp = async (req, res) => {
  // get 
}
