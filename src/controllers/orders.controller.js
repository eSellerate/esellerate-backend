import { 
    getOrder, 
    getOrderBySearch, 
    getOrderProducts, 
    getOrdersAll, 
    getOrdersArchived, 
    getOrdersPending, 
    getOrdersRecent 
} from "../repositories/orders.js"

export const getMercadoLibreOrdersAll = async (req, res) => {
    const response = await getOrdersAll(req.token)
    res.status(response.status)
    res.json(response)
}

export const getMercadoLibreOrder = async (req, res) => {
    const response = await getOrder(req)
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

export const getMercadoLibreOrdersArchived = async (req, res) => {
    const response = await getOrdersArchived(req.token)
    res.status(response.status)
    res.json(response)
}