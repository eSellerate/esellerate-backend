/* eslint-disable camelcase */
// repositories
import { getUserInfo, refreshToken } from '../repositories/user.js'
import {
  getCategories,
  getChildCategories,
  getPostTypes,
  getItems,
  getUserProducts,
}
  from '../repositories/products.js'
import { GetMercadoLibreAuthValues, GetMercadoLibreAppValues, SetMercadoLibreAuthValues } from '../utilities/MercadoLibreAuth.js'
import { getQuestionsAll } from '../repositories/questions.js'

export const getProfile = async (req, res) => {
  const user = req.user
  try {
    const { fk_mlapp, personal_token, refresh_token } = await GetMercadoLibreAuthValues(user.id)
    const response = await getUserInfo(personal_token)
    if (response.status !== 200) {
      // get client_secrets
      const { client_secret } = await GetMercadoLibreAppValues(fk_mlapp)
      // try to refresh token
      const response = await refreshToken({
        clientId: fk_mlapp,
        clientSecret: client_secret,
        refreshToken: refresh_token
      })
      if (response.status !== 200) {
        res.status(response.status).json(response.data)
      }
      // update token
      await SetMercadoLibreAuthValues(user.id, response.data)
      if (response.status === 200) {
        res.status(response.status).json(response)
      }
    }
    if (response.status === 200) {
      res.status(response.status).json(response.data)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getMercadoLibreCategories = async (req, res) => {
  const categories = await getCategories()
  res.status(categories.status)
  res.json(categories)
}

export const getMercadoLibreChildCategories = async (req, res) => {
  const { id } = req.params
  const childCategories = await getChildCategories(id)
  res.status(childCategories.status)
  res.json(childCategories)
}

export const getMercadoLibrePostTypes = async (req, res) => {
  const productTypes = await getPostTypes()
  res.status(productTypes.status)
  res.json(productTypes)
}

export const getMercadoLibreItems = async (req, res) => {
  const { id } = req.query
  const list = await getItems(id)
  res.status(list.status)
  res.json(list)
}

export const getMercadoLibreUserProducts = async (req, res) => {
  // get user
  const user = req.user
  const mercadolibreValues = await GetMercadoLibreAuthValues(user.id)
  if (!mercadolibreValues) {
    res.status(404).json({
      message: 'El usuaro no tiene una cuenta de Mercado Libre asociada'
    })
    return
  }
  const { personal_token } = mercadolibreValues
  const list = await getItems(personal_token)
  if (list.status !== 200) {
    res.status(list.status)
    res.json(list)
  }
  const { results } = list.data
  const products = []
  for (let i = 0; i < results.length; i++) {
    const product = await getUserProducts(results[i])
    if (product.status !== 200) {
      continue
    }
    const { data } = product
    products.push(data)
  }
  res.status(200)
  res.json(products)
}

export const refreshTokenMercadoLibre = async (req, res) => {
  const { clientId, clientSecret, refreshToken } = req.body
  try {
    const response = await refreshToken({ clientId, clientSecret, refreshToken })
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getMercadoLibreQuestionsAll = async (req, res) => {
  const response = await getQuestionsAll()
  res.status(response.status)
  res.json(response)
}
