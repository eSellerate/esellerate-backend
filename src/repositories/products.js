import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'
import 'dotenv/config'

// repository
import { getUserInfo } from './user.js'

const baseUrl = 'https://api.mercadolibre.com'

export const getCategories = async () => {
  try {
    const response = await axios.get(baseUrl + '/sites/MLM/categories')
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getChildCategories = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/categories/${id}`)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getPostTypes = async () => {
  try {
    const response = await axios.get(baseUrl + '/sites/MLM/listing_types')
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getItems = async (token) => {
  // get user id
  const user = await getUserInfo(token)
  if (user.status !== 200) {
    return user
  }
  const { id } = user.data
  try {
    const response = await axios.get(baseUrl + `/users/${id}/items/search?catalog_listing=false`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getUserProducts = async (productID) => {
  try {
    const response = await axios.get(baseUrl + `/items/${productID}`)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}