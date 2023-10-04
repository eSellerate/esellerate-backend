import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

export const getCategories = async () => {
  try {
    const response = await axios.get('https://api.mercadolibre.com/sites/MLM/categories')
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getChildCategories = async (id) => {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/categories/${id}`)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getPostTypes = async () => {
  try {
    const response = await axios.get('https://api.mercadolibre.com/sites/MLM/listing_types')
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getItems = async (sellerID) => {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/users/${sellerID}/items/search?catalog_listing=false`, {
      headers: {
        Authorization: process.env.TOKEN
      }
    })
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getUserProducts = async (productID) => {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/items/${productID}`)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}
