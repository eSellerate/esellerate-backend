import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'
import { baseUrl, getMercadoLibreSellerIDFromToken } from '../utilities/Utilities.js'
import { getOrder } from './orders.js'

const getPackID = async (token, query) => {
    let pack_id = query.pack_id
    if (!pack_id) {
        let order = await getOrder(token, query.order_id)
        pack_id = order.body.pack_id
        if (!pack_id)
            pack_id = order.body.id
    }
    return pack_id
}

export const getMessageMotives = async (token, query) => {
    try {
        const pack_id = getPackID(token, query)
        const url = baseUrl + `/messages/action_guide/packs/${pack_id}/caps_available?tag=post_sale`
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

export const getMessages = async (token, query) => {
    try {
        const seller_id = getMercadoLibreSellerIDFromToken(token)
        const pack_id = getPackID(token, query)
        const url = baseUrl + `/messages/action_guide/packs/${pack_id}/sellers/${seller_id}?tag=post_sale`
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
        const url = baseUrl + `/messages/${id}?tag=post_sale`
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

const processAttachments = async (attachments, token) => {
    let attachments_ids = []
    if(attachments.length === 0)
        return attachments_ids
    const url = baseUrl + `/messages/attachments?tag=post_sale&site_id=MLM`
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        }
    }
    let nodes = Object.keys(attachments);
    for (let i = 0; i < nodes.length; i++) {
        try{
            let response = await axios.post(url, attachments[i], options)
            attachments_ids.push(response.data.id)
        }
        catch (error) {
            throw error
        }
    }
    return attachments_ids
}

export const sendMessage = async (req) => {
    try {
        const attachments_ids = processAttachments(req.body.attachments, req.token)
        const seller_id = getMercadoLibreSellerIDFromToken(req.token)
        const pack_id = getPackID(token, req.body)
        const url = baseUrl + `/messages/packs/${pack_id}/sellers/${seller_id}?tag=post_sale`
        const options = {
            headers: {
                Authorization: `Bearer ${req.token}`
            }
        }
        const body = req.body
        const requestData = {
            from: {
                user_id: seller_id,
            },
            to: {
                user_id: body.client_id
            },
            text: body.text,
            attachments: attachments_ids
        };
        const response = await axios.post(url, requestData, options)
        return HandleAxiosResponse.handleSuccess(response)
    } catch (error) {
        return HandleAxiosResponse.handleError(error)
    }
}

export const getAttachment = async (token, id) =>{
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
/*
ⓘ 𝘌𝘴𝘵𝘦 𝘮𝘦𝘯𝘴𝘢𝘫𝘦 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘥𝘰 𝘺 𝘭𝘢 𝘤𝘶𝘦𝘯𝘵𝘢 𝘥𝘦 𝘦𝘴𝘵𝘦 𝘶𝘴𝘶𝘢𝘳𝘪𝘰 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘳𝘦𝘴𝘵𝘳𝘪𝘯𝘨𝘪𝘥𝘢. 
𝘌𝘴𝘵𝘢 𝘣𝘢𝘫𝘰 𝘪𝘯𝘷𝘦𝘴𝘵𝘪𝘨𝘢𝘤𝘪𝘰𝘯 𝘱𝘰𝘳 𝘳𝘢𝘤𝘪𝘴𝘮𝘰, 𝘤𝘳𝘪𝘮𝘦𝘯𝘦𝘴 𝘥𝘦 𝘰𝘥𝘪𝘰 𝘺 𝘵𝘦𝘳𝘳𝘰𝘳𝘪𝘴𝘮𝘰 𝘥𝘰𝘮𝘦𝘴𝘵𝘪𝘤𝘰.
*/