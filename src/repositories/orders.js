import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'
import { getMercadoLibreSellerIDFromToken, baseUrl } from '../utilities/Utilities.js'
import { getUserProducts } from './products.js'
import MessageRelevant from '../models/MessageRelevant.js'

export const getOrder = async (token, order_id) => {
  try {
    const url = baseUrl + `/orders/${order_id}`
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

export const getOrdersByPackID = async (token, pack_id) => {
  try {
    const url = baseUrl + `/packs/${pack_id}`
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

export const getOrdersByAnyID = async (token, id) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + `/orders/search?seller=${seller_id}&q=${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let response = await axios.get(url, options)
    if (response.data.results.length === 0) {
      response = await getOrdersByPackID(token, id)
      const orders = []
      const nodes = Object.keys(response.data.orders)
      for (let i = 0; i < nodes.length; i++) {
        const order = await getOrder(token, response.data.orders[i].id)
        orders.push(order.data)
      }
      response.data = orders
    }
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    console.log(error.message)
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
      'item', 'tags', 'tags.not', 'q', 'order.status', 'order.date_last_updated.from',
      'order.date_last_updated.to', 'order.date_created.to', 'order.date_closed.from',
      'order.date_closed.to', 'mediations.stage', 'mediations.status', 'feedback.status',
      'feedback.sale.rating', 'feedback.sale.fulfilled', 'feedback.purchase.rating',
      'feedback.purchase.fulfilled']
    const seller_id = getMercadoLibreSellerIDFromToken(req.token)
    let url = baseUrl + '/orders/search?seller=' + seller_id
    search_fields.forEach(field => {
      if (req.query[field]) {
        url = url + '&' + field + '=' + req.body[field]
      }
    })
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

export const getOrdersByDateRange = async (token, date_from) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + `/orders/search?seller=${seller_id}` +
      `&order.date_created.from=${date_from.toISOString().split('T')[0]}T00:00:00.000-00:00`
    //  + `&order.date_created.to=2015-07-31T00:00:00.000-00:00`
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

export const getOrdersAll = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + '/orders/search?seller=' + seller_id +
      '&order.status=paid&sort=date_desc'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    const nodes = Object.keys(response.data.results)
    for (let i = 0; i < nodes.length; i++) {
      const product = await getUserProducts(token, response.data.results[i].order_items[0].item.id)
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
    console.log(response.data)
    const nodes = Object.keys(response.data.results)
    for (let i = 0; i < nodes.length; i++) {
      const product = await getUserProducts(token, response.data.results[i].order_items[0].item.id)
      response.data.results[i].order_items[0].item.image = product.data.pictures[0].url
      response.data.results[i].enabled = true
    }
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getOrdersUnfulfilled = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + '/orders/search/recent?seller=' + seller_id + '&order.status=paid'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    const nodes = Object.keys(response.data.results)
    for (let i = 0; i < nodes.length; i++) {
      const product = await getUserProducts(token, response.data.results[i].order_items[0].item.id)
      response.data.results[i].order_items[0].item.image = product.data.pictures[0].url
      response.data.results[i].enabled = true
    }
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
