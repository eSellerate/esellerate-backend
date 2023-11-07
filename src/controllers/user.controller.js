/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import UserType from '../models/UserType.js'
import MercadoLibreAuth from '../models/MercadoLibreAuth.js'
import MercadoLibreApp from '../models/MercadoLibreApp.js'

// repositories
import {
  generateNewToken,
  refreshToken
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
      model: MercadoLibreAuth,
      include: {
        model: MercadoLibreApp
      }
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
  req.session.destroy()
  // try to refresh token
  const { client_secret } = user.dataValues.mercadolibre_auth.mercadolibre_apps[0].dataValues
  const { fk_mlapp, refresh_token } = user.dataValues.mercadolibre_auth
  const response = await refreshToken({
    clientId: fk_mlapp,
    clientSecret: client_secret,
    refreshToken: refresh_token
  })
  if (response.status !== 200) {
    res.status(response.status).json(response.data)
    return
  }
  // update token
  await MercadoLibreAuth.update({
    personal_token: response.data.access_token,
    refresh_token: response.data.refresh_token
  }, {
    where: {
      id: user.dataValues.id
    }
  })
  res.status(200).json({
    message: 'Bienvenido/a!',
    sid,
    user: {
      id: user.dataValues.id,
      email: user.dataValues.email,
      firstName: user.dataValues.first_name,
      lastName: user.dataValues.last_name,
      photoUrl: user.dataValues.photo_url
    }
  })
}

export const logout = async (req, res) => {
  // get user from cookie
  const sid = req.sid
  // delete session
  await req.sessionStore.destroy(sid)
  res.status(200).json({
    message: 'Sesión cerrada correctamente'
  })
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
    redirect_uri,
    auth_code
  } = req.body
  // check if client_id is already registered
  const mercadoLibreApp = await MercadoLibreApp.findOne({
    where: {
      client_id
    }
  })
  // get user from cookie
  const user = req.user
  if (mercadoLibreApp) {
    // asosiate app with user
    const { client_secret, redirect_url } = mercadoLibreApp.dataValues
    // generate new token
    const response = await generateNewToken({
      client_id,
      client_secret,
      redirect_uri: redirect_url,
      code: auth_code
    })
    if (response.status !== 200) {
      res.status(response.status).json(response.data)
      return
    }
    const { access_token, refresh_token } = response.data
    // create new mercado libre auth
    await MercadoLibreAuth.create({
      id: user.id,
      fk_mlapp: client_id,
      personal_token: access_token,
      refresh_token
    })
    res.status(200).json({
      message: 'La aplicación se vinculó correctamente con el usuario.'
    })
    return
  }
  // generate new token
  const response = await generateNewToken({
    client_id,
    client_secret,
    redirect_uri,
    code: auth_code
  })
  if (response.status !== 200) {
    res.status(response.status).json(response.data)
    return
  }
  const { access_token, refresh_token } = response.data
  // create new mercado libre app
  await MercadoLibreApp.create({
    client_id,
    client_secret,
    redirect_url: redirect_uri
  })
  // create new mercado libre auth
  await MercadoLibreAuth.create({
    id: user.id,
    fk_mlapp: client_id,
    personal_token: access_token,
    refresh_token
  })
  res.status(200).json({
    message: 'Se registró la aplicación correctamente.'
  })
}

export const validateApp = async (req, res) => {
  // extract user from cookie
  const user = req.user
  // look if user has a mercadolibre auth
  const mlAuth = await MercadoLibreAuth.findOne({
    where: {
      id: user.id
    }
  })
  if (!mlAuth) {
    res.status(202).json({
      message: 'No tienes aplicación de mercado libre vinculada.'
    })
    return
  }
  res.status(200).json({ user })
}

export const getProfile = async (req, res) => {
  // extract user from cookie
  const user = await User.findOne({
    attributes: {
      exclude: ['password', 'user_type_id']
    },
    where: {
      id: req.user.id
    },
    include: {
      model: UserType
    }
  })
  res.status(200).json({
    user
  })
}
