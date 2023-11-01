import { Router } from 'express'

// import controllers
import {
  getProfile,
  getMercadoLibreCategories,
  getMercadoLibreChildCategories,
  getMercadoLibrePostTypes,
  getMercadoLibreItems,
  getMercadoLibreUserProducts,
} from '../controllers/example.controller.js'
import {
  createMercadoLibrePublication,
  createMercadoLibrePublicationTest,
  closeMercadoLibrePublication,
  deleteMercadoLibrePublication,
} from '../controllers/publication.controller.js'
import { login } from '../controllers/user.controller.js'
import { createMercadoLibreAnswerByQuestionID, deleteMercadoLibreQuestion, getMercadoLibreQuestion, getMercadoLibreQuestionsAll, getMercadoLibreQuestionsFromItem } from '../controllers/questions.controller.js'

const router = Router()

// mercado libre
router.get('/mercado-libre/profile', getProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)
router.get('/mercado-libre/categories/:id', getMercadoLibreChildCategories)
router.get('/mercado-libre/product-types', getMercadoLibrePostTypes)
router.get('/mercado-libre/items', getMercadoLibreItems)
router.get('/mercado-libre/product', getMercadoLibreUserProducts)

//publicaciones
router.get('/mercado-libre/publish', createMercadoLibrePublication)
router.get('/mercado-libre/publishTest', createMercadoLibrePublicationTest)
router.get('/mercado-libre/close', closeMercadoLibrePublication)
router.get('/mercado-libre/delete', deleteMercadoLibrePublication)

//preguntas
router.get('/mercado-libre/questions_all', getMercadoLibreQuestionsAll)
router.get('/mercado-libre/questions_from_item', getMercadoLibreQuestionsFromItem)
router.get('/mercado-libre/question_by_id', getMercadoLibreQuestion)
router.get('/mercado-libre/question_delete', deleteMercadoLibreQuestion)
router.get('/mercado-libre/question_answer', createMercadoLibreAnswerByQuestionID)

// user controller todo
router.post('/login', login)

export default router
