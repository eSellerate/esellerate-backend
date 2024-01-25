import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'
import { baseUrl, getMercadoLibreSellerIDFromToken } from '../utilities/Utilities.js'
import { getOrder } from './orders.js'

export const getPackID = async (token, query) => {
  let pack_id = query.pack_id
  if (!pack_id) {
    const order = await getOrder(token, query.order_id)
    pack_id = order.body.pack_id
    if (!pack_id) { pack_id = order.body.id }
  }
  return pack_id
}

export const getMessageMotives = async (token, packId) => {
  try {
    const url = baseUrl + `/messages/action_guide/packs/${packId}/caps_available?tag=post_sale`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    return response
  } catch (error) {
    error.message = 'error getting message motives: ' + error.message
    throw error
  }
}

export const getMessages = async (token, pack_id) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + `/messages/packs/${pack_id}/sellers/${seller_id}?tag=post_sale`
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

export const getMessageByMessageID = async (token, id) => {
  try {
    const sellerid = getMercadoLibreSellerIDFromToken(token)
    const url = baseUrl + `/messages/packs/${id}/sellers/${sellerid}?tag=post_sale`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    console.log(response.data)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getMessageByMessageIDUnread = async (token, id) => {
  try {
    const sellerid = getMercadoLibreSellerIDFromToken(token)
    console.log(baseUrl + `/messages/packs/${id}/sellers/${sellerid}?tag=post_sale`)
    const url = baseUrl + `/messages/packs/${id}/sellers/${sellerid}?tag=post_sale`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    console.log(response.data)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const processAttachments = async (attachments, token) => {
  const attachments_ids = []
  if (attachments.length === 0) { return attachments_ids }
  const url = baseUrl + '/messages/attachments?tag=post_sale&site_id=MLM'
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data'
    }
  }
  for (let i = 0; i < attachments.length; i++) {
    try {
      const formData = new FormData()
      formData.append('file', attachments[i])
      const response = await axios.post(url, formData, options)
      attachments_ids.push(response.data.id)
    } catch (error) {
      console.log('Error processing attachments :' + error.message)
      console.log(error.request)
      throw error
    }
  }
  return attachments_ids
}

export const sendMessage = async (token, pack_id, client_id, text, attachments) => {
  try {
    let attachments_ids = []
    if (attachments !== null) { attachments_ids = processAttachments(attachments, token) }
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    // const pack_id = getPackID(token, req.body)
    const url = baseUrl + `/messages/packs/${pack_id}/sellers/${seller_id}?tag=post_sale`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    // const body = req.body
    const requestData = {
      from: {
        user_id: seller_id
      },
      to: {
        user_id: client_id
      },
      text,
      attachments: attachments_ids
    }
    const response = await axios.post(url, requestData, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const sendMessageMotiveOther = async (token, pack_id, text) => {
  try {
    const url = baseUrl + `/messages/action_guide/packs/${pack_id}/option`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const requestData = {
      option_id: 'OTHER',
      text
    }
    const response = await axios.post(url, requestData, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getAttachment = async (token, id) => {
  try {
    const url = baseUrl + `/messages/attachments/${id}?tag=post_sale&site_id=MLM`
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

export const getMessagesPendingAll = async (token) => {
  try {
    const url = baseUrl + '/messages/unread?role=seller&tag=post_sale'
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
/*
ⓘ 𝘌𝘴𝘵𝘦 𝘮𝘦𝘯𝘴𝘢𝘫𝘦 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘥𝘰 𝘺 𝘭𝘢 𝘤𝘶𝘦𝘯𝘵𝘢 𝘥𝘦 𝘦𝘴𝘵𝘦 𝘶𝘴𝘶𝘢𝘳𝘪𝘰 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘳𝘦𝘴𝘵𝘳𝘪𝘯𝘨𝘪𝘥𝘢.
𝘌𝘴𝘵𝘢 𝘣𝘢𝘫𝘰 𝘪𝘯𝘷𝘦𝘴𝘵𝘪𝘨𝘢𝘤𝘪𝘰𝘯 𝘱𝘰𝘳 𝘳𝘢𝘤𝘪𝘴𝘮𝘰, 𝘤𝘳𝘪𝘮𝘦𝘯𝘦𝘴 𝘥𝘦 𝘰𝘥𝘪𝘰 𝘺 𝘵𝘦𝘳𝘳𝘰𝘳𝘪𝘴𝘮𝘰 𝘥𝘰𝘮𝘦𝘴𝘵𝘪𝘤𝘰.
*/
