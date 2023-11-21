/* eslint-disable camelcase */
import { GetMercadoLibreAuthValues } from '../../utilities/MercadoLibreAuth.js'

export const getMercadoLibreToken = async (req, res, next) => {
  const user = req.user
  const mercadolibreValues = await GetMercadoLibreAuthValues(user.id)
  if (!mercadolibreValues) {
    res.status(404).json({
      message: 'El usuario no tiene una cuenta de Mercado Libre asociada'
    })
    return
  }
  const { personal_token } = mercadolibreValues
  req.token = personal_token
  next()
}
