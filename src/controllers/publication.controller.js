import {
  createPublication,
  createPublicationTest,
  closePublication,
  deletePublication,
  pausePublication,
  enablePublication
}
  from '../repositories/publications.js'

export const createMercadoLibrePublication = async (req, res) => {
  const response = await createPublication(req)
  res.status(response.status)
  res.json(response)
}

export const createMercadoLibrePublicationTest = async (req, res) => {
  const response = await createPublicationTest()
  res.status(response.status)
  res.json(response)
}

export const pauseMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await pausePublication(req.token, id)
  res.status(200)
  res.json(response.data)
}

export const activateMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await enablePublication(req.token, id)
  res.status(200)
  res.json(response.data)
}

export const closeMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await closePublication(req.token, id)
  res.status(response.status)
  res.json(response)
}

export const deleteMercadoLibrePublication = async (req, res) => {
  const { ID } = req.body
  const response = await deletePublication(req.token, ID)
  res.status(response.status)
  res.json(response)
}
