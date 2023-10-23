/* eslint-disable camelcase */
// models
import User from '../models/User.js'
import MercadolibreApp from '../models/MercadolibreApp.js'

// repositories
import { refreshToken as generateNewToken } from '../repositories/user.js'

export const login = async (req, res) => {
  // get email and password from request body
  const { username, email, password } = req.body
  if (!username && !email) {
    res.status(400).json({
      message: 'Username or email is required'
    })
    return
  }
  // find user by email
  const user = await User.findOne({
    where: {
      email
    },
    attributes: ['email', 'password', 'first_name', 'last_name'],
    include: {
      model: MercadolibreApp
    }
  })
  // check if user exists
  if (!user) {
    res.status(404).json({
      message: `El usuario con email ${email} no existe`
    })
    return
  }
  // check if password is correct (add bcrypt)
  if (user.password !== password) {
    res.status(401).json({
      message: 'El usuario o la contraseña son incorrectos'
    })
    return
  }
  // check refresh token
  const { client_id, client_secret, refresh_token } = user.dataValues.mercadolibre_app
  if (!refresh_token) {
    res.status(401).json({
      message: 'El usuario no tiene un refresh token asociado'
    })
    return
  }
  // refresh the token
  try {
    const newToken = await generateNewToken({
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: refresh_token
    })
    // update access token and refresh token in database
    await MercadolibreApp.update({
      access_token: newToken.data.access_token,
      refresh_token: newToken.data.refresh_token
    }, {
      where: {
        client_id
      }
    })
    res.status(200).json({
      message: `Bienvenido/a ${user.first_name} ${user.last_name}`
    })
  } catch (error) {
    res.status(401).json({
      message: 'El refresh token no es válido'
    })
  }
}
