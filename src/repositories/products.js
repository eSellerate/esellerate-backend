import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

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
    const response = await axios.get(baseUrl + '/categories/${id}')
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

export const getItems = async (sellerID) => {
  try {
    const response = await axios.get(baseUrl + '/users/${sellerID}/items/search?catalog_listing=false', {
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
    const response = await axios.get(baseUrl + '/items/${productID}')
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const createPublication = async (publicationData) => {
  try {
    let baseConfig = {
      url: baseUrl + '/items',
      headers: {
        Authorization: 'Bearer APP_USR-7741438893697913-100415-7ed277435391055f7e6a70db3bec7126-1489297309'
      },
    }
    let config = baseConfig.concat(publicationData);
    const response = await axios.post(config)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const createPublicationTest = async () => {
  try {
    let config = {
      url: baseUrl + '/items',
      headers: {
        Authorization: 'Bearer APP_USR-7741438893697913-100415-7ed277435391055f7e6a70db3bec7126-1489297309'
      },
      data: {
        title: "Muñeco MALO - No Ofertar",
        category_id: "MLM455858",
        price: 230,
        currency_id: "MXN",
        available_quantity: 10,
        buying_mode: "buy_it_now",
        condition: "new",
        listing_type_id: "gold_special",
        sale_terms: [
          {
            id: "WARRANTY_TYPE",
            value_name: "Garantía del vendedor"
          },
          {
            id: "WARRANTY_TIME",
            value_name: "90 días"
          }
        ],
        pictures: [
          {
            source: "https://m.media-amazon.com/images/I/31H9Cgi4tDL._QL70_ML2_.jpg"
          }
        ],
        attributes: [
          {
            id: "BRAND",
            value_name: "Generic"
          },
          {
            id: "EAN",
            value_name: "7898095297749"
          }
        ],
        shipping: {
          mode: "not_specified",
          local_pick_up: false,
          free_shipping: false,
          methods: [],
          dimensions: null,
          tags: [],
          logistic_type: "not_specified",
          store_pick_up: false
        }
      },
    }
    const response = await axios.post(config)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}