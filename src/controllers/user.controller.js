/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import MercadoLibreAuth from '../models/MercadoLibreAuth.js'
import MercadoLibreApp from '../models/MercadoLibreApp.js'
import crypto from 'crypto'

// repositories
import {
  generateNewToken
} from '../repositories/user.js'
// middleware
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

  // create and store session
  const sessionObject = {
    id: user.dataValues.id,
    email: user.dataValues.email,
    password: user.dataValues.password,
    firstName: user.dataValues.first_name,
    lastName: user.dataValues.last_name
  }
  // generate session id and store session
  const sid = req.session.id
  req.sessionStore.set(sid, sessionObject, (error) => {
    if (error) {
      res.status(500).json({
        message: 'Ocurrió un error al iniciar sesión, intente nuevamente'
      })
    }
  })

  // destructuring mercadolibre app data
  const { mercadolibre_auth } = user.dataValues
  if (!mercadolibre_auth) { // check if user has a mercado libre app associated
    res.status(202).json({
      message: 'El usuario no tiene una aplicación de Mercado Libre asociada',
      sid,
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email,
        firstName: user.dataValues.first_name,
        lastName: user.dataValues.last_name,
        photoUrl: user.dataValues.photo_url
      }
    })
    // delete session
    req.session.destroy()
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

export const testSession = async (req, res) => {
  console.log(req.user)
  res.status(200).json({
    message: 'Session ok',
    session: req.session
  })
}

export const addNewMercadoLibreApp = async (req, res) => {
  // get parameters from request
  const {
    client_id,
    client_secret,
    redirect_uri
  } = req.body
  // find client_id in "mercadolibre_app" table in database
  const mercadoLibreApp = await MercadoLibreApp.findOne({
    where: {
      client_id
    }
  })
  // check if client_id exists
  if (mercadoLibreApp) {
    res.status(404).json({
      message: `La aplicación con client_id ${client_id} ya existe`
    })
    return
  }
  // generate new token
  const generatedToken = await generateNewToken(req.body)
  if (generatedToken.status !== 200) {
    res.status(generatedToken.status).json({
      message: generatedToken.data.message
    })
    return
  }
  // create new mercado libre app
  try {
    const newMercadoLibreApp = await MercadoLibreApp.create({
      client_id,
      client_secret,
      redirect_url: redirect_uri
    })
    await MercadoLibreAuth.create({
      id: req.user.id,
      fk_mlapp: newMercadoLibreApp.dataValues.client_id,
      personal_token: generatedToken.data.access_token,
      refresh_token: generatedToken.data.refresh_token
    })
    // if everything is ok, return success message
    res.status(200).json({
      message: 'Aplicación de Mercado Libre creada correctamente',
      data: generatedToken.data
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.errors[0].message
    })
  }
}

export const validateApp = async (req, res) => {
  // extract user from cookie
  const user = req.user
  // look if user has a mercadolibre auth
  console.log('hola', user)
  const mlAuth = await MercadoLibreAuth.findOne({
    where: {
      id: user.id
    }
  })
  if (!mlAuth) {
    res.status(400).json({
      message: 'No tienes aplicación de mercado libre vinculada.'
    })
    return
  }
  res.status(200).json({ user })
}
