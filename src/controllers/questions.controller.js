// repositories
import { 
  getQuestionsAll,
  getQuestionsFromItem,
  getMercadoLibreQuestion,
  deleteMercadoLibreQuestion,
  createAnswerByQuestionID } from '../repositories/questions.js'

export const getMercadoLibreQuestionsAll = async (req, res) => {
  const response = await getQuestionsAll()
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreQuestionsFromItem = async (req, res) => {
  const response = await getQuestionsFromItem(req)
  res.status(response.status)
  res.json(response)
}

export const getMercadoLibreQuestion = async (req, res) => {
  const response = await getQuestion(req)
  res.status(response.status)
  res.json(response)
}

export const deleteMercadoLibreQuestion = async (req, res) => {
  const response = await deleteMercadoLibreQuestion(req)
  res.status(response.status)
  res.json(response)
}

export const createMercadoLibreAnswerByQuestionID = async (req, res) => {
  const response = await createAnswerByQuestionID(req)
  res.status(response.status)
  res.json(response)
}