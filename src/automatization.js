/*
No se donde meter esta surrada le pueden cambiar lo que sea
todo es tu culpa amlo idiota
*/

import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import MercadoLibreApp from './models/MercadolibreApp.js'

//hace falta una funcion para renovar el token automaticamente por k sino esto revienta
export async function automaticMessages() {
    let users = await MercadoLibreAuth.findAll();
    console.log(users[0].dataValues)
}