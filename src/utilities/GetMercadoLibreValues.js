// model
import User from '../models/User.js'
import MercadolibreApp from '../models/MercadolibreApp.js'

/**
 * retrieves the MercadoLibre values from specified user
 * @param userId  user id
 * @returns Object with MercadoLibre values
 */
async function GetMercadoLibreValues (userId) {
  const user = await User.findOne({
    where: {
      id: userId
    },
    include: {
      model: MercadolibreApp
    }
  })
  if (!user) {
    return null
  }
  const { dataValues } = user.dataValues.mercadolibre_app
  return dataValues
}

export default GetMercadoLibreValues
