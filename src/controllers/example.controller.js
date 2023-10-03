// repositories
import { getUserInfo } from '../repositories/user.js'
import { getCategories, getChildCategories, getPostTypes } from '../repositories/products.js'

export const getProfile = async (req, res) => {
  const response = await getUserInfo()
  const { data } = response
  res.json(data)
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
