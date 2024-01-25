import axios from 'axios'
import MessageRelevant from '../models/MessageRelevant.js'
import {
  getOrder,
  getOrderBySearch,
  getOrderProducts,
  getOrdersAll,
  getOrdersArchived,
  getOrdersByAnyID,
  getOrdersPending,
  getOrdersRecent,
  getOrdersUnfulfilled
} from '../repositories/orders.js'
import { getMercadoLibreSellerIDFromToken } from '../utilities/Utilities.js'

export const getMercadoLibreOrdersAll = async (req, res) => {
  const response = await getOrdersAll(req.token)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrder = async (req, res) => {
  const { id } = req.query
  const response = await getOrdersByAnyID(req.token, id)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrderProducts = async (req, res) => {
  const response = await getOrderProducts(req)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrderBySearch = async (req, res) => {
  const response = await getOrderBySearch(req)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrdersRecent = async (req, res) => {
  const response = await getOrdersRecent(req.token)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrdersPending = async (req, res) => {
  const response = await getOrdersPending(req.token)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrdersUnfulfilled = async (req, res) => {
  const response = await getOrdersUnfulfilled(req.token)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreOrdersArchived = async (req, res) => {
  const response = await getOrdersArchived(req.token)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreImportantInformation = async (req, res) => {
  const sellerId = getMercadoLibreSellerIDFromToken(req.token)
  const relevant = await MessageRelevant.findAll({
    where: {
      user_id: sellerId
    },
    raw: true
  })
  for (let i = 0; i < relevant.length; i++) {
    relevant[i].information = JSON.parse(relevant[i].text)
    const response2 = await axios.get(`https://api.mercadolibre.com/messages/attachments/${relevant[i].information.image}?tag=post_sale&site_id=MLM`,
      {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    )
    const base64ImageString = Buffer.from(response2.data, 'binary').toString('base64')
    relevant[i].image = base64ImageString
    relevant[i].information = relevant[i].information.information
  }
  res.status(200)
  res.json(relevant)
}
