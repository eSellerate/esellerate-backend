import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'
import 'dotenv/config'

// repository
import { getUserInfo } from './user.js'
import { response } from 'express'

import { baseUrl } from '../utilities/Utilities.js'

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

export const getItems = async (token, offset) => {
  // get user id
  const user = await getUserInfo(token)
  if (user.status !== 200) {
    return user
  }
  const { id } = user.data
  const url = baseUrl + `/users/${id}/items/search?catalog_listing=false&offset=${offset}&limit=10&orders=start_time_desc`
  console.log(url)
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getUserProducts = async (token, productID) => {
  try {
    const response = await axios.get(baseUrl + `/items/${productID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const predictCategory = async (query) => {
  try {
    const response = await axios.get(baseUrl + '/sites/MLM/domain_discovery/search',
      {
        params: query
      }
    )
    return response
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}
