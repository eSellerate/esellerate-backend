/*
No se donde meter esta surrada le pueden cambiar lo que sea
todo es tu culpa amlo idiota
*/

import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import MercadoLibreApp from './models/MercadolibreApp.js'
import { getMessageMotives, getMessages, sendMessage, sendMessageMotiveOther } from './repositories/messages.js';
import { getOrdersByDateRange, getOrdersPending, getOrdersRecent } from './repositories/orders.js';

//hace falta una funcion para renovar el token automaticamente por k sino esto revienta

var previousDate = new Date("2023-11-10");
var defaultMessage = "Muchas gracias por su compra"

async function processMessage(token, order, id, client_id) {
    let nodes = Object.keys(order.order_items);
    let bDefaultMessage = true;
    for (let i = 0; i < nodes.length; i++) {
        let item = order.order_items[i]
        //revisar si el item esta en la base de datos con
        //mensaje personalizado
        if (false) {
            bDefaultMessage = false
            //sendMessage
        }
    }
    if (bDefaultMessage) {
        let response = await sendMessage(token, id, client_id, defaultMessage, null)
        if (response.data === undefined) {
            response = await sendMessageMotiveOther(token, id, defaultMessage)
        }
    }
}

async function processOrder(token, order) {
    //console.log(order.order_items)
    let id = order.id
    if (order.pack_id !== null) {
        id = order.pack_id
    }
    let client_id = order.buyer.id
    let messages = await getMessages(token, id)
    //console.log(messages.data.messages)
    let motives = await getMessageMotives(token, id)
    //console.log(motives.data)
    let bProcessMessage = true
    if (motives.data) {
        let found = motives.data.filter(function (item) { return item.option_id === 'OTHER'; });
        if (found[0].cap_available === 0)
            bProcessMessage = false
    }
    if (messages.data.messages.length > 0) {
        bProcessMessage = false
        let message_moderation = messages.data.messages[0].message_moderation
        if (message_moderation.status == ! 'rejected'
            && message_moderation.reason == ! 'automatic_message')
            bProcessMessage = true
        if (message_moderation.code === 'forbidden')
            bProcessMessage = false
    }
    if (bProcessMessage) {
        processMessage(token, order, id, client_id)
    }
}

async function processToken(token) {
    let recent_orders = await getOrdersByDateRange(token, previousDate)
    //console.log(recent_orders.data.results)
    let nodes = Object.keys(recent_orders.data.results);
    for (let i = 0; i < nodes.length; i++) {
        let order = recent_orders.data.results[i]
        processOrder(token, order)
    }
}

export async function automaticMessages(newDate) {
    try {
        let apps = await MercadoLibreApp.findAll();
        let nodes = Object.keys(apps);
        for (let i = 0; i < nodes.length; i++) {
            //console.log(apps[i].dataValues)
            let token = await MercadoLibreAuth.findOne({
                where: {
                    fk_mlapp: apps[i].dataValues.client_id
                }
            });
            await processToken(token.personal_token)
        }
        previousDate = newDate
    }
    catch (error) {
        console.log(error.response)
    }
}