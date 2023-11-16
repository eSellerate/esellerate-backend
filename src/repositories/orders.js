import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'
import { getMercadoLibreSellerIDFromToken } from './questions.js'
import { getUserProducts } from './products.js'

const baseUrl = 'https://api.mercadolibre.com'

export const getOrder = async (req) => {
  try {
    const url = baseUrl + `/orders/${req.body.order_id}`
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrderProducts = async (req) => {
  try {
    const url = baseUrl + `/orders/${req.body.order_id}/product`
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrderBySearch = async (req) => {
  try {
    const search_fields = [
      "item", "tags", "tags.not", "q", "order.status", "order.date_last_updated.from",
      "order.date_last_updated.to", "order.date_created.to", "order.date_closed.from",
      "order.date_closed.to", "mediations.stage", "mediations.status", "feedback.status",
      "feedback.sale.rating", "feedback.sale.fulfilled", "feedback.purchase.rating",
      "feedback.purchase.fulfilled"]
    const seller_id = getMercadoLibreSellerIDFromToken(req.token)
    var url = baseUrl + `/orders/search?seller=` + seller_id
    search_fields.forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        url = url + "&" + field + "=" + req.body[field]
      }
    });
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrdersAll = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + '/orders/search?seller=' + seller_id 
              + '&order.status=paid&sort=date_desc'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    let nodes = Object.keys(response.data.results);
    for (let i = 0; i < nodes.length; i++) {
      var product = await getUserProducts(response.data.results[i].order_items[0].item.id)
      response.data.results[i].order_items[0].item.image = product.data.pictures[0].url
      response.data.results[i].enabled = true
    }
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrdersRecent = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + '/orders/search/recent?seller=' + seller_id 
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrdersPending = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + '/orders/search/pending?seller=' + seller_id 
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrdersArchived = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + '/orders/search/archived?seller=' + seller_id 
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}