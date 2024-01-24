import { Op } from 'sequelize'
import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import AnswersAutoGeneral from './models/AnswersAutoGeneral.js'
import MercadolibreApp from './models/MercadolibreApp.js'
import axios from 'axios'
import { baseUrl } from './utilities/Utilities.js'
import { getMessageMotives } from './repositories/messages.js'

const keywords = [
  { word: 'Nombre', uid: 'name' },
  { word: 'Tamaño', uid: 'size' },
  { word: 'Fondo', uid: 'background' },
  { word: 'Diseño', uid: 'background' },
  { word: 'Figura', uid: 'shape' },
  { word: 'Forma', uid: 'shape' }
]

const disabledMessagesModerationTypes = ['forbidden', 'rejected', 'automatic_message']

let previousDate = new Date('2023-11-10')

async function refreshUserToken (user) {
  const { client_id, client_secret } = global.gmercadoLibreApp
  const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
    grant_type: 'refresh_token',
    client_id,
    client_secret,
    refresh_token: user.refresh_token
  })
  const token = response.data
  await MercadoLibreAuth.update({
    personal_token: token.access_token,
    refresh_token: token.refresh_token
  }, {
    where: {
      id: user.id
    }
  })
  user.personal_token = token.access_token
  user.refresh_token = token.refresh_token
}

async function getOrders (user, date) {
  const urlOrders = baseUrl + `/orders/search/recent?seller=${user.id}` +
    `&order.date_created.from=${date.toISOString().split('T')[0]}T00:00:00.000-00:00`
  //  + `&order.date_created.to=2015-07-31T00:00:00.000-00:00`
  const response = await axios.get(urlOrders, {
    headers: {
      Authorization: `Bearer ${user.personal_token}`
    }
  })
  return response.data.results
}

async function getMessages (user, packId) {
  const response = await axios.get(baseUrl + `/messages/packs/${packId}/sellers/${user.id}?tag=post_sale`,
    {
      headers: {
        Authorization: `Bearer ${user.personal_token}`
      }
    }
  )
  return response.data.messages
}

async function sendAutoGeneralMessages (user, order) {
  const autoGeneral = await AnswersAutoGeneral.findAll({
    where: {
      user_id: user.id
    },
    raw: true
  })
}

async function sendAutoMessages (user, date) {
  let orders
  // check unread messages first

  // then check recent sales
  try {
    orders = await getOrders(user, date)
  } catch (error) {
    console.log(error.message)
    return
  }
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i]
    let packId = order.pack_id
    if (!packId) {
      packId = order.id
    }
    const messages = await getMessages(user, packId)
    const motives = await getMessageMotives(user.personal_token, user.id)
    if (messages == null) { return }
    if (messages.data.messages.length > 0) {
      const messageModeration = messages[0].messageModeration
      if (disabledMessagesModerationTypes.includes(messageModeration)) { return }
    }
    if (motives.status_code != null) {
      if (motives.code === 'blocked_by_excepted_case') {
        // process message
        return
      }
    }
    if (messages.length < 2) {
      if (messages.length < 1) {
        // if (messages[0])
      }
    }
  }
}

export async function answersAuto (newDate) {
  try {
    const users = await MercadoLibreAuth.findAll({
      where: {
        id: { [Op.ne]: 1 }
      },
      raw: true
    })
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      try {
        refreshUserToken(user)
      } catch (error) {
        console.log('error refreshing user token')
        console.log(error.message)
        continue
      }
      sendAutoMessages(user, previousDate)
    }
    previousDate = newDate
  } catch (error) {
    console.log(error.message)
  }
}

export const handleNotifications = async (req, res) => {
  console.log('RECIBI UNA NOTIFICACION')
  console.log(req)
  res.status(200)
}
