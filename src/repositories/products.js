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

export const getItems = async (sellerID) => {
  try {
    const response = await axios.get(baseUrl + `/users/${sellerID}/items/search?catalog_listing=false`, {
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
    const response = await axios.get(baseUrl + `/items/${productID}`)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const createPublication = async (publicationData) => {
  try {
    const url = baseUrl + '/items'
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
    const response = await axios.post(url, publicationData, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const createPublicationTest = async () => {
  try {
    const url = baseUrl + '/items'
    const data = {
      title: "Muñeco MALO REMASTERED - No Ofertar",
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
    }
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
        'Content-Type': 'application/json',
      }
    }
    const response = await axios.post(url, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const closePublication = async (productID) => {
  try {
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
    const data = {
      status: 'closed'
    }
    const response = await axios.put(baseUrl + `/items/${productID}`, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const deletePublication = async (productID) => {
  closePublication(productID)
  try {
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
    const data = {
      deleted: 'true'
    }
    const response = await axios.put(baseUrl + `/items/${productID}`, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}