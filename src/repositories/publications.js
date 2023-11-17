import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

import { baseUrl } from '../utilities/Utilities.js'

export const createPublication = async (publicationData) => {
  try {
    const url = baseUrl + '/items'
    const options = {
      headers: {
        Authorization: `Bearer ${publicationData.token}`
      }
    }
    const response = await axios.post(url, publicationData.body, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const createPublicationTest = async () => {
  try {
    const url = baseUrl + '/items'
    const data = {
      title: "Muñeco MALO - No Ofertar",
      category_id: "MLM455858",
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
        'Content-Type': 'application/json',
      }
    }
    const response = await axios.post(url, data, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const closePublication = async (req) => {
  try {
    const { id } = req.query
    const options = {
      headers: {
        Authorization: req.token
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

export const deletePublication = async (req) => {
  try {
    const { id } = req.query
    const options = {
      headers: {
        Authorization: req.token,
      },
    }
    const dataClose = {
      status: 'closed'
    }
    const dataDelete = {
      deleted: 'true'
    }
    const responseUnused = await axios.put(baseUrl + `/items/${id}`, dataClose, options)
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
        Authorization: req.token,
      },
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