// repositories
import { getUserInfo } from '../repositories/user.js'
import { getCategories } from '../repositories/products.js'

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
