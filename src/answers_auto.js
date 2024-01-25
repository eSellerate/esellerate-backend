import { Op } from 'sequelize'
import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import AnswersAutoGeneral from './models/AnswersAutoGeneral.js'
import MercadolibreApp from './models/MercadolibreApp.js'
import axios from 'axios'
import { baseUrl } from './utilities/Utilities.js'
import { getMessageMotives, processAttachments } from './repositories/messages.js'
import pkg from 'convert-svg-to-png'
import path from 'node:path'
import fs from 'node:fs'
const { convertFile } = pkg

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

export const pngTest = async (req, res) => {
  const inputFilePath = path.join(global.__dirname, 'image_processing', 'outputs', 'output.svg')
  console.log(inputFilePath)
  const outputFilePath = await convertFile(inputFilePath, [])
  res.sendFile(outputFilePath)
}

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

async function sendMessage (user, buyer, packId, text, attachments) {
  try {
    let attachmentsIds = []
    if (attachments !== null) { attachmentsIds = attachments }
    const response = await axios.post(baseUrl + `/messages/packs/${packId}/sellers/${user.id}?tag=post_sale`,
      {
        from: {
          user_id: user.id
        },
        to: {
          user_id: buyer.id
        },
        text,
        attachments: attachmentsIds
      },
      {
        headers: {
          Authorization: `Bearer ${user.personal_token}`
        }
      }
    )
    return response.data
  } catch (error) {
    error.message = 'Error sending automatic message: ' + error.message
    console.log(error.message)
    console.log(error.response.data)
  }
}

async function handleDesign (user, buyer, packId, message) {
  try {
    // get parameters
    if (!message.includes('diseño')) { return }
    // const response = await axios.get(process.env.SERVER_DESIGN + `mask=mask_bone_big&background=background_32&text=Chewis&id=${packId}`)
    // const attachments = []
    // attachments.push(response.data)
    // console.log(response.data)
    // sendMessage(user, buyer, packId, '', attachments)
    const image = fs.createReadStream('src/image_processing/outputs/' + packId + '.png')
    const formData = new FormData()
    formData.append('file', image)
    console.log(formData)
    const response2 = await axios.post(baseUrl + '/messages/attachments?tag=post_sale&site_id=MLM',
      formData,
      {
        headers: {
          Authorization: `Bearer ${user.personal_token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
  } catch (error) {
    error.message = 'Error sending automatic design: ' + error.message
    console.log(error.message)
    console.log(error.response.data)
  }
}

async function sendAutoGeneralMessage (user, buyer, packId) {
  console.log('Sending first message')
  const autoGeneral = await AnswersAutoGeneral.findAll({
    where: {
      user_id: user.id
    },
    raw: true
  })
  for (let i = 0; i < autoGeneral.length; i++) {
    try {
      await sendMessage(user, buyer, packId, autoGeneral[i].text, null)
    } catch (error) {
      console.log(error.message)
      return
    }
  }
}

async function sendAutoMessages (user, date) {
  let orders
  // check unread messages first

  // then check recent sales
  try {
    orders = await getOrders(user, date)
  } catch (error) {
    error.message = 'error getting orders: ' + error.message
    throw error
  }
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i]
    let packId = order.pack_id
    if (!packId) {
      packId = order.id
    }
    const messages = await getMessages(user, packId)
    let motives
    try {
      motives = await getMessageMotives(user.personal_token, packId)
    } catch (error) {
      console.log(error.message)
      const errorData = error.response.data
      if (errorData === undefined) { continue }
      if (errorData.code !== 'blocked_by_excepted_case') { continue }
      console.log(errorData)
    }
    if (messages == null) { continue }
    if (messages.length > 0) {
      const messageModeration = messages[0].messageModeration
      if (disabledMessagesModerationTypes.includes(messageModeration)) { continue }
    }
    if (messages.length < 2) {
      if (messages.length < 1) {
        sendAutoGeneralMessage(user, order.buyer, packId)
      } else if (messages[0].from.user_id !== user.id) {
        sendAutoGeneralMessage(user, order.buyer, packId)
      }
    }
    handleDesign(user, order.buyer, packId, 'diseño')
    // debuging
    // await sendMessage(user, order.buyer, packId, 'Porfavor envielo a la brevedad', null)
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
      try {
        sendAutoMessages(user, previousDate)
      } catch (error) {
        console.log('error sending automatic messages')
        console.log(error.message)
        continue
      }
    }
    previousDate = newDate
  } catch (error) {
    console.log('whole auto messages crash! :')
    console.log(error.message)
  }
}

export const handleNotifications = async (req, res) => {
  console.log('RECIBI UNA NOTIFICACION')
  console.log(req)
  res.status(200)
}
