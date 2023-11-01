import {
  createPublication,
  createPublicationTest,
  closePublication,
  deletePublication
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

export const closeMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await closePublication(id)
  res.status(response.status)
  res.json(response)
}

export const deleteMercadoLibrePublication = async (req, res) => {
  const { id } = req.query
  const response = await deletePublication(id)
  res.status(response.status)
  res.json(response)
}