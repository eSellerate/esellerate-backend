/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import MercadoLibreAuth from '../models/MercadoLibreAuth.js'

// repositories
import { refreshToken as generateNewToken } from '../repositories/user.js'
import checkValidations from '../validator/checkValidations.js'

export const login = async (req, res) => {
  // validate request data
  if (checkValidations(req, res)) {
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
      model: MercadoLibreAuth
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
  const { mercadolibre_auth } = user.dataValues
  if (!mercadolibre_auth) { // check if user has a mercado libre app associated
    res.status(403).json({
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
  console.log('data', user.dataValues)
  // try to generate new token
  res.status(200).json({})
}

export const register = async (req, res) => {
  // handle validator errors
  if (checkValidations(req, res)) {
    return
  }
  // get request body data
  const { userType, userName, email, password, firstName, lastName } = req.body
  try {
    const user = await User.create({
      user_type_id: userType,
      username: userName ?? null,
      email,
      password,
      first_name: firstName,
      last_name: lastName
    })
    res.status(200).json({
      message: 'Usuario creado correctamente',
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error al crear el usuario, intente nuevamente'
    })
  }
}

export const addMercadoLibreApp = async (req, res) => {
  // get
}
