import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

import { baseUrl } from '../utilities/Utilities.js'

export const createPublication = async (publicationData) => {
  try {
    let body = publicationData.body
    var customMessages = null
    if (body.customMessages != null) {
      var customMessages = JSON.parse(JSON.stringify(body.customMessages));
      delete body.customMessages
    }
    const url = baseUrl + '/items'
    const options = {
      headers: {
        Authorization: `Bearer ${publicationData.token}`
      }
    }
    const response = await axios.post(url, body, options)
    if (customMessages != null) {
    }
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const editPublication = async (requestData, productId) => {
  // update name and price
  try {
    const response = await axios.put(`https://api.mercadolibre.com/items/${productId}`, requestData.body, {
      headers: {
        Authorization: `Bearer ${requestData.token}`,
        'Content-Type': 'application/json'
      }
    })
    // console.log(response)
    return response
  } catch (error) {
    // console.log(error.response.data)
    return error
  }
}

export const editPublicationDescription = async (request, productID) => {
  // update description
  try {
    const response = await axios.put(`https://api.mercadolibre.com/items/${productID}/description`,
      {
        plain_text: request.body.description
      },
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
          'Content-Type': 'application/json'
        }
      })
    return response
  } catch (error) {
    return error
  }
}

export const createPublicationTest = async () => {
  try {
    const url = baseUrl + '/items'
    const data = {
      title: 'Muñeco MALO - No Ofertar',
      category_id: 'MLM455858',
      price: 230,
      currency_id: 'MXN',
      available_quantity: 10,
      buying_mode: 'buy_it_now',
      condition: 'new',
      listing_type_id: 'gold_special',
      sale_terms: [
        {
          id: 'WARRANTY_TYPE',
          value_name: 'Garantía del vendedor'
        },
        {
          id: 'WARRANTY_TIME',
          value_name: '90 días'
        }
      ],
      pictures: [
        {
          source: 'https://m.media-amazon.com/images/I/31H9Cgi4tDL._QL70_ML2_.jpg'
        }
      ],
      attributes: [
        {
          id: 'BRAND',
          value_name: 'Generic'
        },
        {
          id: 'EAN',
          value_name: '7898095297749'
        }
      ],
      shipping: {
        mode: 'not_specified',
        local_pick_up: false,
        free_shipping: false,
        methods: [],
        dimensions: null,
        tags: [],
        logistic_type: 'not_specified',
        store_pick_up: false
      }
    }
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post(url, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const closePublication = async (token, id) => {
  try {
    const options = {
      headers: {
        Authorization: token
      }
    }
    const data = {
      status: 'closed'
    }
    const response = await axios.put(baseUrl + `/items/${id}`, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const pausePublication = async (token, id) => {
  try {
    const options = {
      headers: {
        Authorization: token
      }
    }
    const data = {
      status: 'paused'
    }
    const response = await axios.put(baseUrl + `/items/${id}`, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const republishPublication = async (token, id) => {
  try {
    const options = {
      headers: {
        Authorization: token
      }
    }
    const data = {
      status: 'closed'
    }
    const response = await axios.put(baseUrl + `/items/${id}`, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const deletePublication = async (token, id) => {
  try {
    const options = {
      headers: {
        Authorization: token
      }
    }
    const dataClose = {
      status: 'closed'
    }
    const dataDelete = {
      deleted: 'true'
    }
    await axios.put(baseUrl + `/items/${id}`, dataClose, options)
    const response = await axios.put(baseUrl + `/items/${id}`, dataDelete, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const modifyPublication = async (req) => {
  try {
    const options = {
      headers: {
        Authorization: req.token
      }
    }
    const data = {
      deleted: 'true'
    }
    const response = await axios.put(baseUrl + `/items/${req.body.id}`, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}
