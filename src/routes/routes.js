import { Router } from 'express'

// import controllers
import {
  getProfile as getMercadoLibreProfile,
  getMercadoLibreCategories,
  getMercadoLibreChildCategories,
  getMercadoLibrePostTypes,
  getMercadoLibreItems,
  getMercadoLibreUserProducts
} from '../controllers/example.controller.js'

import {
  login,
  logout,
  register,
  addNewMercadoLibreApp,
  validateApp,
  getProfile as getUserProfile
} from '../controllers/user.controller.js'

import {
  createMercadoLibrePublication,
  createMercadoLibrePublicationTest,
  closeMercadoLibrePublication,
  deleteMercadoLibrePublication
} from '../controllers/publication.controller.js'

import {
  createMercadoLibreAnswerByQuestionID,
  deleteMercadoLibreQuestion,
  getMercadoLibreQuestion,
  getMercadoLibreQuestionsAll,
  getMercadoLibreQuestionsFromItem
} from '../controllers/questions.controller.js'

// middlewares
import { validateLogin, validateRegister } from '../validator/validators.js'
import { checkCookieCredentials } from '../middlewares/security/checkCredentials.js'
import { getMercadoLibreToken } from '../middlewares/mercadolibre/getMercadoLibreToken.js'

const router = Router()

// mercado libre
router.get('/mercado-libre/profile', checkCookieCredentials, getMercadoLibreProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)
router.get('/mercado-libre/categories/:id', getMercadoLibreChildCategories)
router.get('/mercado-libre/product-types', getMercadoLibrePostTypes)
router.get('/mercado-libre/items', getMercadoLibreItems)
router.get('/mercado-libre/product', checkCookieCredentials, getMercadoLibreUserProducts)
router.get('/mercado-libre/product', getMercadoLibreUserProducts)

// publicaciones
router.get('/mercado-libre/publish', createMercadoLibrePublication)
router.get('/mercado-libre/publishTest', createMercadoLibrePublicationTest)
router.get('/mercado-libre/close', closeMercadoLibrePublication)
router.get('/mercado-libre/delete', deleteMercadoLibrePublication)

// user controller
router.post('/login', validateLogin, login)
router.post('/logout', checkCookieCredentials, logout)
router.post('/register', validateRegister, register)
router.post('/add-mercadolibre-app', checkCookieCredentials, addNewMercadoLibreApp)
router.get('/validate-session', checkCookieCredentials, validateApp)
router.get('/profile', checkCookieCredentials, getUserProfile)

// preguntas
router.get('/mercado-libre/questions_all',
  checkCookieCredentials,
  getMercadoLibreToken,
  getMercadoLibreQuestionsAll)
router.post('/mercado-libre/questions_from_item', getMercadoLibreQuestionsFromItem)
router.post('/mercado-libre/question_by_id', getMercadoLibreQuestion)
router.post('/mercado-libre/question_delete', deleteMercadoLibreQuestion)
router.post('/mercado-libre/question_answer',
  checkCookieCredentials,
  getMercadoLibreToken,
  createMercadoLibreAnswerByQuestionID)

// user controller todo
router.post('/login', login)

export default router
