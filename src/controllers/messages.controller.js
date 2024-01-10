import {
    getAttachment,
    getMessageByMessageID,
    getMessageMotives,
    getMessages,
    getPackID,
    sendMessage
} from "../repositories/messages.js"

export const getMercadoLibreMessageMotives = async (req, res) => {
    const pack_id = getPackID(req.token, req.query)
    const response = await getMessageMotives(req.token, pack_id)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessages = async (req, res) => {
    const pack_id = getPackID(req.token, req.query)
    const response = await getMessages(req.token, pack_id)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessageByMessageID = async (req, res) => {
    const { id } = req.query
    const response = await getMessageByMessageID(req.token, id)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessageByMessageIDUnread = async (req, res) => {
    const { id } = req.query
    const response = await getMessageByMessageID(req.token, id)
    res.status(response.status)
    res.json(response)
}

export const sendMercadoLibreMessage = async (req, res) => {
    var pack_id = req.body.pack_id
    if (!pack_id)
        pack_id = req.body.order_id
    const response = await sendMessage(req.token, pack_id, req.body.client_id, req.body.text, req.body.attachments)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreMessageAttachment = async (req, res) => {
    const { id } = req.query
    const response = await getAttachment(req.token, id)
    res.status(response.status)
    res.json(response)
}