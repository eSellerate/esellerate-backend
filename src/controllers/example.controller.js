// repositories
import { getUserInfo } from '../repositories/user.js'
import {
  getCategories,
  getChildCategories,
  getPostTypes,
  getItems,
  getUserProducts,
  createPublication,
  createPublicationTest,
  closePublication,
  deletePublication
}
  from '../repositories/products.js'

export const getProfile = async (req, res) => {
  try {
    const { data, status } = await getUserInfo()
    res.status(status).json(data)
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
  const { id } = req.query
  const list = await getItems(id)
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

export const createMercadoLibrePublication = async (req, res) => {
  const response = await createPublication(req)
  res.status(response.status)
  res.json(response)
}

export const createMercadoLibrePublicationTest = async (req, res) => {
  const response = await createPublicationTest()
  res.status(response.status)
  res.json(response)
}

export const closeMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await closePublication(id)
  res.status(response.status)
  res.json(response)
}

export const deleteMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await deletePublication(id)
  res.status(response.status)
  res.json(response)
}
