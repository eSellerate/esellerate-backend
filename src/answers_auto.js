import { Op } from 'sequelize';
import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import AnswersAutoGeneral from './models/AnswersAutoGeneral.js';
import MercadolibreApp from './models/MercadolibreApp.js';
import axios from 'axios';
import { baseUrl } from './utilities/Utilities.js';

const keywords = [
  { word: "Nombre", uid: "name" },
  { word: "Tamaño", uid: "size" },
  { word: "Fondo", uid: "background" },
  { word: "Diseño", uid: "background" },
  { word: "Figura", uid: "shape" },
  { word: "Forma", uid: "shape" },
];

let previousDate = new Date('2023-11-10')

async function refreshUserToken(user) {
  const app = await MercadolibreApp.findOne({
    raw: true
  });
  console.log(app);
  const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
    grant_type: 'refresh_token',
    client_id: app.client_id,
    client_secret: app.client_secret,
    refresh_token: user.refresh_token
  })
  console.log(response.data)
  let token = response.data
  await MercadoLibreAuth.update({
    personal_token: token.access_token,
    refresh_token: token.refresh_token
  }, {
    where: {
      id: user.id
    }
  })
  user.personal_token = token.access_token;
  user.refresh_token = token.refresh_token;
}

async function getOrders(user, date) {
  const urlOrders = baseUrl + `/orders/search/recent?seller=${user.id}`
    + `&order.date_created.from=${date.toISOString().split('T')[0]}T00:00:00.000-00:00`
  //  + `&order.date_created.to=2015-07-31T00:00:00.000-00:00`
  const response = await axios.get(urlOrders, {
    headers: {
      Authorization: `Bearer ${user.personal_token}`
    }
  })
  return response.data.results;
}

async function getMessages(user, pack_id) {
  const response = await axios.get(baseUrl + `/messages/packs/${pack_id}/sellers/${user.id}?tag=post_sale`,
    {
      headers: {
        Authorization: `Bearer ${user.personal_token}`
      }
    }
  );
  return response.data.messages;
}

async function sendAutoMessages(user, date) {
  let orders = await getOrders(user, date);
  const auto_general = await AnswersAutoGeneral.findAll({
    where: {
      user_id: user.id
    },
    raw: true
  });
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    let pack_id = order.pack_id;
    if (!pack_id) {
      pack_id = order.id;
    }
    let messages = await getMessages(user, pack_id);
    if(messages.length < 2){
      if(messages.length < 1){
        
      }
    }
  }
}

export async function answersAuto(newDate) {
  try {
    var users = await MercadoLibreAuth.findAll({
      where: {
        id: { [Op.ne]: 1 }
      },
      raw: true
    });
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      //refreshUserToken(user);
      sendAutoMessages(user, previousDate);
    }
    previousDate = newDate;
  } catch (error) {
    console.log(error.response);
  }
}