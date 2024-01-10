/* eslint-disable camelcase */
// repositories
import { getUserInfo, refreshToken } from '../repositories/user.js'
import {
    getCategories,
    getChildCategories,
    getPostTypes,
    getItems,
    getUserProducts
}
    from '../repositories/products.js'
import { GetMercadoLibreAuthValues, GetMercadoLibreAppValues, SetMercadoLibreAuthValues } from '../utilities/MercadoLibreAuth.js'
import { getQuestionsAll } from '../repositories/questions.js'
import AnswersQuick from '../models/AnswersQuick.js'

export const getAnswersQuick = async (req, res) => {
    try {
        const id = req.user.id;
        const answers = await AnswersQuick.findAll({
            where: {
                user_id: id,
            },
            raw : true
        });
        res.status(200).json(answers)
    } catch (error) {
        if (error.response.status)
            res.status(error.response.status).json(error.message)
        else
            res.status(400).json(error.message)
        console.log("error on getting answers quick")
        console.log(error.message)
    }
}

export const setAnswerQuick = async (req, res) => {
    const answers = await AnswersQuick.findAll();
    console.log(JSON.stringify(answers, null, 2));
}