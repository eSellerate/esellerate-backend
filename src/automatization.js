/* eslint-disable camelcase */
/*
No se donde meter esta surrada le pueden cambiar lo que sea
todo es tu culpa amlo idiota
*/

import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import MercadoLibreApp from './models/MercadolibreApp.js'
import Message from './models/Message.js'
import { getMessageMotives, getMessages, sendMessage, sendMessageMotiveOther } from './repositories/messages.js'
import { getOrdersByDateRange, getOrdersPending, getOrdersRecent } from './repositories/orders.js'

// hace falta una funcion para renovar el token automaticamente por k sino esto revienta

let previousDate = new Date('2023-11-10')
const defaultMessage = 'Muchas gracias por su compra'

async function processMessage (token, order, id, client_id, messages) {
  let bFirstConversaton = true
  if (messages.data.messages.length > 0) {
    bFirstConversaton = false
  }
  const nodes = Object.keys(order.order_items)
  for (let i = 0; i < nodes.length; i++) {
    const item = order.order_items[i].item
    const storedMessages = await Message.findAll({
      where: {
        fk_product_id: item.id
      }
    })
    const nodes = Object.keys(storedMessages)
    for (let i = 0; i < nodes.length; i++) {
      if (storedMessages[i].type == 1 && !bFirstConversaton) { continue }
      let response = await sendMessage(token, id, client_id, storedMessages[i].text, null)
      if (response.data === undefined) {
        response = await sendMessageMotiveOther(token, id, storedMessages[i].text)
      }
    }
  }
  /*
        let response = await sendMessage(token, id, client_id, defaultMessage, null)
        if (response.data === undefined) {
            response = await sendMessageMotiveOther(token, id, defaultMessage)
        }
    */
}

async function processOrder (token, order) {
  // console.log(order.order_items)
  let id = order.id
  if (order.pack_id !== null) {
    id = order.pack_id
  }
  const client_id = order.buyer.id
  const messages = await getMessages(token, id)
  // console.log(messages.data.messages)
  const motives = await getMessageMotives(token, id)
  // console.log(motives.data)
  if (messages.data.messages.length > 0) {
    const message_moderation = messages.data.messages[0].message_moderation
    if (message_moderation.code === 'forbidden' ||
            message_moderation.code === 'rejected' ||
            message_moderation.code === 'automatic_message') { return }
  }
  if (motives.status_code != null) {
    if (motives.code === 'blocked_by_excepted_case') {
      processMessage(token, order, id, client_id, messages)
      return
    }
  }
  if (motives.data) {
    const found = motives.data.filter(function (item) { return item.option_id === 'OTHER' })
    if (found[0].cap_available === 0) {}
  }
}

async function processToken (token) {
  const recent_orders = await getOrdersByDateRange(token, previousDate)
  // console.log(recent_orders.data.results)
  const nodes = Object.keys(recent_orders.data.results)
  for (let i = 0; i < nodes.length; i++) {
    const order = recent_orders.data.results[i]
    processOrder(token, order)
  }
}

export async function automaticMessages (newDate) {
  try {
    const apps = await MercadoLibreApp.findAll()
    const nodes = Object.keys(apps)
    for (let i = 0; i < nodes.length; i++) {
      // console.log(apps[i].dataValues)
      const token = await MercadoLibreAuth.findOne({
        where: {
          fk_mlapp: apps[i].dataValues.client_id
        }
      })
      await processToken(token.personal_token)
    }
    previousDate = newDate
  } catch (error) {
    console.log(error.response)
  }
}
