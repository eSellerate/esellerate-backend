// repositories
import { getQuestionsAll } from '../repositories/questions.js'

export const getMercadoLibreQuestionsAll = async (req, res) => {
  const response = await getQuestionsAll()
  res.status(response.status)
  res.json(response)
}