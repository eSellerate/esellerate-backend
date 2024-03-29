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
import FormData from 'form-data'
import MessageRelevant from './models/MessageRelevant.js'
import Message from './models/Message.js'
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
  let { id } = req.query
  id = id + '.svg'
  const filePath = path.join(global.__dirname, 'image_processing', 'outputs', id)
  res.sendFile(filePath)
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

async function getMessagesWithoutRead (user, packId) {
  const response = await axios.get(baseUrl + `/messages/packs/${packId}/sellers/${user.id}?tag=post_sale&mark_as_read=false`,
    {
      headers: {
        Authorization: `Bearer ${user.personal_token}`
      }
    }
  )
  return response.data.messages
}

async function getUnreadMessages (user, result) {
  try {
    const response = await axios.get(baseUrl + `/messages/${result.resource}?tag=post_sale&mark_as_read=false`,
      {
        headers: {
          Authorization: `Bearer ${user.personal_token}`
        }
      }
    )
    const messages = response.data.messages.slice(0, result.count)
    return messages
  } catch (error) {
    error.message = 'Error getting unread messages : ' + error.message
    throw (error)
  }
}

async function getUnreadResources (user) {
  try {
    const response = await axios.get(baseUrl + '/messages/unread?role=seller&tag=post_sale',
      {
        headers: {
          Authorization: `Bearer ${user.personal_token}`
        }
      }
    )
    return response.data.results
  } catch (error) {
    error.message = 'Error getting unread messages : ' + error.message
    throw (error)
  }
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

async function handleDesign (user, buyer, packId, designInfo) {
  try {
    // get parameters
    const response = await axios.get(process.env.SERVER_DESIGN + `mask=${designInfo.FORMA}&background=background_${designInfo.FONDO}&text=${designInfo.NOMBRE}&id=${packId}`)
    console.log(response.data)
    const attachments = []
    // attachments.push(response.data)
    // console.log(response.data)
    // sendMessage(user, buyer, packId, '', attachments)
    const image = fs.createReadStream('src/image_processing/outputs/' + packId + '.png')
    const formData = new FormData()
    formData.append('file', image, 'hola.png')
    const response2 = await axios.post(baseUrl + '/messages/attachments?tag=post_sale&site_id=MLM',
      formData,
      {
        headers: {
          Authorization: `Bearer ${user.personal_token}`,
          'Content-Type': `multipart/form-data; boundary=${image._boundary}`
        }
      })
    attachments.push(response2.data.id)
    await sendMessage(user, buyer, packId, '', attachments)
    const relevant =
    {
      information: {
        Forma: designInfo.FORMA,
        Fondo: designInfo.FONDO,
        Nombre: designInfo.NOMBRE
      },
      image: response2.data.id
    }
    const values = {
      user_id: user.id,
      order_id: packId,
      text: JSON.stringify(relevant)
    }
    await MessageRelevant.findOne({
      where: {
        user_id: user.id,
        order_id: packId
      }
    }).then(function (obj) {
      if (obj) { return obj.update(values) }
      return MessageRelevant.create(values)
    })
    await getMessages(user, packId)
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

async function processMessages (messages, user, packId) {
  let motives
  try {
    motives = await getMessageMotives(user.personal_token, packId)
  } catch (error) {
    console.log(error.message)
    const errorData = error.response.data
    if (errorData === undefined) { return false }
    if (errorData.code !== 'blocked_by_excepted_case') { return false }
    console.log(errorData)
  }
  if (messages == null) { return false }
  if (messages.length > 0) {
    const messageModeration = messages[0].messageModeration
    if (disabledMessagesModerationTypes.includes(messageModeration)) { return false }
  }
  return true
}

const designParams = ['FONDO', 'FORMA', 'NOMBRE']

async function handleKeywords (user, messages, packId) {
  try {
    const buyer = messages[0].from.user_id
    let mergedMessage = messages[messages.length - 1].text
    for (let i = messages.length - 2; i >= 0; i--) {
      mergedMessage = mergedMessage + ' ' + messages[i].text
    }
    mergedMessage = mergedMessage.replace(/\n/g, ' ')
    mergedMessage = mergedMessage + ' '
    // keyword time
    if (mergedMessage.toUpperCase().indexOf('DIS') !== -1 || mergedMessage.toUpperCase().indexOf('FOND') !== -1) {
      const designInfo = {}
      for (let i = 0; i < designParams.length; i++) {
        const regex = mergedMessage.toUpperCase().indexOf(designParams[i])
        let text = mergedMessage.substring(regex + designParams[i].length + 1, mergedMessage.length)
        text = text.substring(0, text.indexOf(' '))
        designInfo[designParams[i]] = text
      }
      if (designInfo.FORMA.toUpperCase().includes('HUES')) {
        designInfo.FORMA = 'mask_bone_big'
      } else if (designInfo.FORMA.toUpperCase().includes('CORAZ')) {
        designInfo.FORMA = 'mask_heart_big'
      }
      await handleDesign(user, { id: buyer }, packId, designInfo)
    } else {
      await getMessages(user, packId)
    }
  } catch (error) {
    error.message = 'Error handling keywords: ' + error.message
    console.log(error.message)
  }
}

async function sendAutoMessages (user, date) {
  // first unread messages
  let orders
  try {
    // const unreadMessages = await getUnreadMessages(user)
    // console.log(unreadMessages)
    const unreadResources = await getUnreadResources(user)
    for (let i = 0; i < unreadResources.length; i++) {
      const messages = await getUnreadMessages(user, unreadResources[i])
      let packId = messages[0].message_resources[0]
      if (packId.name !== 'packs') {
        packId = messages[0].message_resources[1]
      }
      const process = await processMessages(messages, user, packId.id)
      if (process) {
        await handleKeywords(user, messages, packId.id)
      }
    }
    // handleKeywords(user, order.buyer, packId, unreadMessages)
  } catch (error) {
    console.log(error.message)
  }
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
    const messages = await getMessagesWithoutRead(user, packId)
    if (processMessages(messages, user, packId)) {
      if (messages.length < 2) {
        if (messages.length < 1) {
          sendAutoGeneralMessage(user, order.buyer, packId)
        } else if (messages[0].from.user_id !== user.id) {
          sendAutoGeneralMessage(user, order.buyer, packId)
        }
      }
    }
    // handleDesign(user, order.buyer, packId, 'diseño')
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
