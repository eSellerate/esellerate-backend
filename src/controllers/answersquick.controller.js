/* eslint-disable camelcase */
// model
import AnswersQuick from '../models/AnswersQuick.js'

export const getAnswersQuick = async (req, res) => {
  try {
    const id = req.user.id
    const answers = await AnswersQuick.findAll({
      where: {
        user_id: id
      },
      raw: true
    })
    res.status(200).json(answers)
  } catch (error) {
    if (error.response.status) { res.status(error.response.status).json(error.message) } else { res.status(400).json(error.message) }
    console.log('error on getting answers quick')
    console.log(error.message)
  }
}

export const setAnswerQuick = async (req, res) => {
  const { keyword, answer } = req.body
  if (!keyword || !answer) {
    res.status(400).json({
      message: 'No se enviaron los parametros correctos'
    })
    return
  }
  // get the quick answers of user from database
  const answers = await AnswersQuick.findAll({ where: { user_id: req.user.id } })
  const foundAnswers = answers.map(answer => answer.dataValues)
  const answerWithKeyword = foundAnswers.find(answer => answer.keyword === keyword)
  if (answerWithKeyword) {
    res.status(400).json({
      message: `Ya existe un mensaje con la palabra clave: ${keyword}`
    })
    return
  }
  // Create new quick answer
  await AnswersQuick.create({
    user_id: req.user.id,
    keyword,
    answer
  })
  res.status(200).json({
    message: 'Se añadio la respuesta rápida'
  })
}

export const deleteAnswerQuick = async (req, res) => {
  const { id } = req.body
  console.log(req.body)
  if (!id) {
    res.status(400).json({
      message: 'No se envio el id del mensaje.'
    })
    return
  }
  // find record to delete
  const answer = await AnswersQuick.findOne({ where: { id, user_id: req.user.id } })
  if (!answer) {
    res.status(400).json({
      message: `No se encontro la respuesta con el id: ${id}`
    })
    return
  }
  answer.destroy()
  res.status(200).json({
    message: `Se elimino la respuesta con el id: ${id}`
  })
}
