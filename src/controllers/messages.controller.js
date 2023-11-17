import {
    getAttachment,
    getMessageByMessageID,
    getMessageMotives,
    getMessages,
    sendMessage
} from "../repositories/messages.js"

export const getMercadoLibreMessageMotives = async (req, res) => {
    const response = await getMessageMotives(req.token, req.query)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessages = async (req, res) => {
    const response = await getMessages(req.token, req.query)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessageByMessageID = async (req, res) => {
    const { id } = req.query
    const response = await getMessageByMessageID(req.token, id)
    res.status(response.status)
    res.json(response)
}

export const sendMercadoLibreMessage = async (req, res) => {
    const response = await sendMessage(req)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessageAttachment = async (req, res) => {
    const { id } = req.query
    const response = await getAttachment(req.token, id)
    res.status(response.status)
    res.json(response)
}