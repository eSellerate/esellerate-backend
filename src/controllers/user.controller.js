/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import UserType from '../models/UserType.js'
import MercadoLibreAuth from '../models/MercadoLibreAuth.js'
import MercadoLibreApp from '../models/MercadolibreApp.js'
import axios from 'axios'

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
import { baseUrl } from '../utilities/Utilities.js'
import { GetMercadoLibreAuthValues } from '../utilities/MercadoLibreAuth.js'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

export const login = async (req, res) => {
  try {
    // get code from request body
    const { code } = req.body
    // get app data
    const { client_id, client_secret, redirect_url } = global.gmercadoLibreApp
    console.log(client_id)
    console.log(client_secret)
    console.log(redirect_url)
    // generate token with code
    const token = await generateNewToken({
      client_id,
      client_secret,
      redirect_url,
      code
    })

    // get user info
    const userInfo = await getUserInfo(token.data.access_token)
    const { id, nickname, email } = userInfo.data

    // search if user exists
    let user = await User.findOne({
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
    // if not, register new user
    else {
      user = await User.create({
        id,
        user_type_id: 2,
        nickname,
        email
      })
      await MercadoLibreAuth.create({
        id,
        personal_token: token.data.access_token,
        refresh_token: token.data.refresh_token
      })
    }
    const sid = req.session.id
    req.sessionStore.set(sid, userInfo.data, (error) => {
      if (error) {
        res.status(500).json({
          message: 'Ocurrió un error al iniciar sesión, intente nuevamente'
        })
      }
    })
    req.session.destroy()
    // return success
    res.status(200).json({
      message: 'Bienvenido/a!',
      sid,
      user: userInfo.data
    })
  } catch (error) {
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

const getOtherUserInfo = async (userID) => {
  try {
    const response = await axios.get(baseUrl + `/users/${userID}`)
    return response.data
  } catch (error) {

  }
}

const getBlacklistUserInfo = (user_info) => {
  const blacklist_user_info = {}
  blacklist_user_info.nickname = user_info.nickname
  blacklist_user_info.address = '----'
  if (user_info.address.city !== undefined) {
    blacklist_user_info.address = user_info.address.city
    if (user_info.address.state !== undefined) { blacklist_user_info.address = blacklist_user_info.address + ',' + user_info.address.state }
  }
  return blacklist_user_info
}

export const getBlacklist = async (req, res) => {
  try {
    const id = req.user.id
    const personal_token = req.token
    const order_blacklist = []
    let questions_blacklist = []
    try {
      const response = await axios.get(baseUrl + `/users/${id}/questions_blacklist`, {
        headers: {
          Authorization: `Bearer ${personal_token}`
        }
      })
      questions_blacklist = response.data.users
      for (var i = 0; i < questions_blacklist.length; i++) {
        questions_blacklist[i].questions = true
        questions_blacklist[i].order = false
      }
    } catch (error) {
      questions_blacklist = []
    }
    const response = await axios.get(baseUrl + `/users/${id}/order_blacklist`, {
      headers: {
        Authorization: `Bearer ${personal_token}`
      }
    })
    const response_order_blacklist = response.data
    for (var i = 0; i < response_order_blacklist.length; i++) {
      order_blacklist[i] = {}
      order_blacklist[i].id = response_order_blacklist[i].user.id
      order_blacklist[i].questions = false
      order_blacklist[i].order = true
    }
    let blacklist = []
    if (!questions_blacklist || !questions_blacklist.length) {
      blacklist = order_blacklist
    } else if (!order_blacklist || !order_blacklist.length) {
      blacklist = questions_blacklist
    } else {
      // mergin time
      blacklist = questions_blacklist
      for (var i = 0; i < order_blacklist.length; i++) {
        let found = false
        for (let j = 0; j < blacklist.length; j++) {
          if (blacklist[j].id == order_blacklist[i].id) {
            found = true
            blacklist[j].order = true
            break
          }
        }
        if (!found) {
          blacklist.push(order_blacklist[i])
        }
      }
    }
    // fill info
    for (var i = 0; i < blacklist.length; i++) {
      const user_info = await getOtherUserInfo(blacklist[i].id)
      blacklist[i] = { ...blacklist[i], ...getBlacklistUserInfo(user_info) }
    }
    res.status(200).json(blacklist)
  } catch (error) {
    console.log('Error getting blacklist: ')
    console.log(error.message)
    if (error.response) { res.status(error.response.status).json(error.message) }
    res.status(400).json(error.message)
  }
}

export const searchUserByNickname = async (nickname) => {
  try {
    const response = await axios.get(baseUrl + `/sites/MLM/search?nickname=${nickname}`)
    return await getOtherUserInfo(response.data.seller.id)
  } catch (error) {

  }
}

export const getUserByIDOrNickname = async (id_nickname) => {
  try {
    let response = await getOtherUserInfo(id_nickname)
    if (!response) { response = await searchUserByNickname(id_nickname) }
    return response
  } catch (error) {
    return
  };
}

export const blacklistUser = async (token, sellerid, buyerid, type) => {
  try {
    let url = baseUrl + `/users/${sellerid}/`
    switch (type) {
      case 'order':
        url = url + 'order_blacklist'
        break
      case 'questions':
        url = url + 'questions_blacklist'
        break
      default:
        return
    }
    const response = await axios.post(
      url,
      {
        user_id: buyerid
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('blacklisting')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log('error on blacklist')
    console.log(error.message)
  }
}

export const blacklistUsers = async (req, res) => {
  try {
    const id = req.user.id
    const personal_token = req.token
    const blacklist_types = req.body.blacklist_types
    let users = req.body.users
    console.log('blacklisting several users')
    console.log(users)
    for (var i = 0; i < users.length; i++) {
      users[i] = await getUserByIDOrNickname(users[i])
    }
    console.log(users)
    users = users.filter(function (element) {
      return element !== undefined
    })
    for (var i = 0; i < blacklist_types.length; i++) {
      for (let j = 0; j < users.length; j++) {
        await blacklistUser(personal_token, id, users[j].id, blacklist_types[i])
      }
    }
    console.log('users blocked')
    res.status(200).json('Usuarios bloqueados')
  } catch (error) {
    if (error.response) { res.status(error.response.status).json(error.message) }
    res.status(400).json(error.message)
    console.log('error on blacklisting users')
    console.log(error.message)
  }
}

export const unBlacklistUser = async (req, res) => {
  try {
    const id = req.user.id
    const personal_token = req.token
    const user_id = req.body.user_id
    const type = req.body.type
    let url = baseUrl + `/users/${id}/`
    switch (type) {
      case 'order':
        url = url + 'order_blacklist'
        break
      case 'questions':
        url = url + 'questions_blacklist'
        break
      default:
        return
    }
    url = url + `/${user_id}`
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${personal_token}`
      }
    })
    res.status(200).json(response.data)
  } catch (error) {
    console.log(error)
  }
}
