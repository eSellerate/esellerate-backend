import { predictCategory } from '../repositories/products.js'

export const domainDiscovery = async (req, res) => {
  const response = await predictCategory(req.query)
  res.status(response.status).json(response.data)
}
