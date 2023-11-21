import { Router } from 'express'

// import controllers
import {
  getProfile as getMercadoLibreProfile,
  getMercadoLibreCategories,
  getMercadoLibreChildCategories,
  getMercadoLibrePostTypes,
  getMercadoLibreItems,
  getMercadoLibreUserProducts,
  getMercadoLibreProductByID
} from '../controllers/example.controller.js'

import {
  login,
  logout,
  register,
  addNewMercadoLibreApp,
  validateApp,
  getProfile as getUserProfile,
  uploadImage
} from '../controllers/user.controller.js'

import {
  createMercadoLibrePublication,
  createMercadoLibrePublicationTest,
  closeMercadoLibrePublication,
  deleteMercadoLibrePublication,
  pauseMercadoLibrePublication,
  activateMercadoLibrePublication
} from '../controllers/publication.controller.js'

import {
  createMercadoLibreAnswerByQuestionID,
  deleteMercadoLibreQuestion,
  getMercadoLibreQuestion,
  getMercadoLibreQuestionsAll,
  getMercadoLibreQuestionsFromItem
} from '../controllers/questions.controller.js'

import { domainDiscovery, modifyProduct } from '../controllers/product.controller.js'

import { generateSaleOrder } from '../controllers/pdf.controller.js'
// middlewares
import { validateLogin, validateRegister } from '../validator/validators.js'
import { checkCookieCredentials } from '../middlewares/security/checkCredentials.js'
import { getMercadoLibreToken } from '../middlewares/mercadolibre/getMercadoLibreToken.js'
import {
  getMercadoLibreOrder,
  getMercadoLibreOrderBySearch,
  getMercadoLibreOrderProducts,
  getMercadoLibreOrdersAll,
  getMercadoLibreOrdersArchived,
  getMercadoLibreOrdersPending,
  getMercadoLibreOrdersRecent
} from '../controllers/orders.controller.js'
import { getMercadoLibreMessageAttachment, getMercadoLibreMessageByMessageID, getMercadoLibreMessageMotives, getMercadoLibreMessages, sendMercadoLibreMessage } from '../controllers/messages.controller.js'

const router = Router()

// mercado libre
router.get('/mercado-libre/profile', checkCookieCredentials, getMercadoLibreProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)
router.get('/mercado-libre/categories/:id', getMercadoLibreChildCategories)
router.get('/mercado-libre/product-types', getMercadoLibrePostTypes)
router.get('/mercado-libre/items', getMercadoLibreItems)
router.get('/mercado-libre/product', checkCookieCredentials, getMercadoLibreUserProducts)
router.get('/mercado-libre/product', getMercadoLibreUserProducts)
router.get('/mercado-libre/product_by_id', checkCookieCredentials, getMercadoLibreProductByID)
router.get('/mercado-libre/predict-category', domainDiscovery)

// publicaciones
router.post('/mercado-libre/publish', checkCookieCredentials, getMercadoLibreToken, createMercadoLibrePublication)
router.get('/mercado-libre/publishTest', createMercadoLibrePublicationTest)
router.get('/mercado-libre/close', closeMercadoLibrePublication)
router.get('/mercado-libre/delete', deleteMercadoLibrePublication)
router.put('/mercado-libre/modifyProduct', checkCookieCredentials, getMercadoLibreToken, modifyProduct)
router.post('/mercado-libre/pause', checkCookieCredentials, getMercadoLibreToken, pauseMercadoLibrePublication)
router.post('/mercado-libre/enable', checkCookieCredentials, getMercadoLibreToken, activateMercadoLibrePublication)

// user controller
router.post('/login', validateLogin, login)
router.post('/logout', checkCookieCredentials, logout)
router.post('/register', validateRegister, register)
router.post('/add-mercadolibre-app', checkCookieCredentials, addNewMercadoLibreApp)
router.get('/validate-session', checkCookieCredentials, validateApp)
router.get('/profile', checkCookieCredentials, getUserProfile)
router.post('/upload-image', uploadImage)

// preguntas
router.get('/mercado-libre/questions_all',
  checkCookieCredentials,
  getMercadoLibreToken,
  getMercadoLibreQuestionsAll)
router.post('/mercado-libre/questions_from_item', getMercadoLibreQuestionsFromItem)
router.post('/mercado-libre/question_by_id',
  checkCookieCredentials,
  getMercadoLibreToken,
  getMercadoLibreQuestion)
router.post('/mercado-libre/question_delete',
  checkCookieCredentials,
  getMercadoLibreToken,
  deleteMercadoLibreQuestion)
router.post('/mercado-libre/question_answer',
  checkCookieCredentials,
  getMercadoLibreToken,
  createMercadoLibreAnswerByQuestionID)

// orders (ventas)
router.get('/mercado-libre/orders_all',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrdersAll)
router.get('/mercado-libre/order_by_id',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrder)
router.get('/mercado-libre/order_products_by_id',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrderProducts)
router.get('/mercado-libre/orders_by_search',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrderBySearch)
router.get('/mercado-libre/orders_recent',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrdersRecent)
router.get('/mercado-libre/orders_archived',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrdersArchived)
router.get('/mercado-libre/orders_pending',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreOrdersPending)

// messages
router.get('/mercado-libre/messages',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreMessages)
router.get('/mercado-libre/message_motives',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreMessageMotives)
router.get('/mercado-libre/message_by_id',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreMessageByMessageID)
router.post('/mercado-libre/message_send',
  checkCookieCredentials, getMercadoLibreToken, sendMercadoLibreMessage)
router.get('/mercado-libre/message_attachment',
  checkCookieCredentials, getMercadoLibreToken, getMercadoLibreMessageAttachment)

// user controller todo
router.post('/login', login)
router.post('/generate-order', checkCookieCredentials, getMercadoLibreToken, generateSaleOrder)

export default router
