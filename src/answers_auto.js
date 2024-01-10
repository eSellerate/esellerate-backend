import { Op } from 'sequelize';
import MercadoLibreAuth from './models/MercadoLibreAuth.js'
import AnswersAutoGeneral from './models/AnswersAutoGeneral.js';

async function processUser(user) {
  const auto_general = await AnswersAutoGeneral.findAll({
    where: {
      user_id: user.id
    },
    raw: true
  });
  console.log(auto_general);
}

export async function answersAuto() {
  try {
    const users = await MercadoLibreAuth.findAll({
      where: {
        id: { [Op.ne]: 1 }
      },
      raw: true
    });
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      processUser(users[i]);
    }
  } catch (error) {
    console.log(error.response);
  }
}