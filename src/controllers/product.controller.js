/* eslint-disable camelcase */
import { predictCategory } from '../repositories/products.js'
import { editPublication, editPublicationDescription } from '../repositories/publications.js'

export const domainDiscovery = async (req, res) => {
  const response = await predictCategory(req.query)
  res.status(response.status).json(response.data)
}

export const modifyProduct = async (req, res) => {
  const { product_id } = req.query
  if (!product_id) {
    res.status(400).json({
      message: 'No se envio un Product ID'
    })
    return
  }
  const { description } = req.body
  if (description) {
    await editPublicationDescription(req, product_id)
    delete req.body.description
  }
  const response = await editPublication(req, product_id)
  if (response.status !== 200) {
    res.status(400).json({
      message: 'No se pudo editar la publicación.',
      cause: response.response.data.cause
    })
    return
  }
  res.status(200).json({
    message: 'Se edito la publicación.'
  })
}
