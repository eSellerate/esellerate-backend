/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import UserType from '../models/UserType.js'
import MercadoLibreAuth from '../models/MercadoLibreAuth.js'
import MercadoLibreApp from '../models/MercadolibreApp.js'

// repositories
import {
  generateNewToken,
  getUserInfo,
  refreshToken
} from '../repositories/user.js'
// middleware
import checkValidations from '../validator/checkValidations.js'
import path from 'node:path'
import 'dotenv/config'

export const login = async (req, res) => {
  try {
    // get code from request body
    const { code } = req.body

    // get app data
    const { client_id, client_secret, redirect_url } = global.gmercadoLibreApp

    //generate token with code
    const token = await generateNewToken({
      client_id,
      client_secret,
      redirect_url,
      code: code
    })

    //get user info
    const userInfo = await getUserInfo(token.data.access_token)
    const { id, nickname, email } = userInfo.data

    //search if user exists
    var user = await User.findOne({
      where: {
        id
      }
    })
    if (user) {
      await MercadoLibreAuth.update({
        personal_token: token.data.access_token,
        refresh_token: token.data.refresh_token
      }, {
        where: {
          id
        }
      })
    }
    //if not, register new user
    else {
      user = await User.create({
        id: id,
        user_type_id: 2,
        nickname: nickname,
        email
      })
      await MercadoLibreAuth.create({
        id: id,
        personal_token: token.data.access_token,
        refresh_token: token.data.refresh_token
      })
    }
    console.log("about to generate session")
    // generate session id and store session
    const sid = req.session.id
    req.sessionStore.set(sid, userInfo.data, (error) => {
      if (error) {
        res.status(500).json({
          message: 'Ocurrió un error al iniciar sesión, intente nuevamente'
        })
      }
    })
    req.session.destroy()
    console.log("session destroyed")
    //return success
    res.status(200).json({
      message: 'Bienvenido/a!',
      sid,
      user: userInfo.data
    })
  }
  catch (error) {
    console.log("Login error")
    console.log(error.message)
    res.status(500).json({
      message: 'Ocurrió un error al iniciar sesion: ' + error.message
    })
  }
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
  const { userName, email, password, firstName, lastName } = req.body
  try {
    const user = await User.create({
      user_type_id: 2,
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
      exclude: ['user_type_id']
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

export const uploadImage = (req, res) => {
  const { files } = req.files
  if (!files) {
    res.status(400).json({
      message: 'No se subio la imágen'
    })
    return
  }
  const paths = []
  files.forEach(data => {
    const p = path.parse(data.path).base
    paths.push(process.env.SERVER_NAME + p)
  })
  res.status(200).json({
    message: 'imagen(es) guardada(s).',
    images: paths
  })
}
