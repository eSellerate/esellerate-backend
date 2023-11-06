import { Router } from 'express'

// import controllers
import {
  getProfile as getMercadoLibreProfile,
  getMercadoLibreCategories,
  getMercadoLibreChildCategories,
  getMercadoLibrePostTypes,
  getMercadoLibreItems,
  getMercadoLibreUserProducts,
  createMercadoLibrePublication,
  createMercadoLibrePublicationTest,
  closeMercadoLibrePublication,
  deleteMercadoLibrePublication,
  getMercadoLibreQuestionsAll
} from '../controllers/example.controller.js'
import {
  login,
  register,
  addNewMercadoLibreApp,
  validateApp,
  getProfile as getUserProfile
} from '../controllers/user.controller.js'

// middlewares
import { validateLogin, validateRegister } from '../validator/validators.js'
import { checkCookieCredentials } from '../middlewares/security/checkCredentials.js'

const router = Router()

// mercado libre
router.get('/mercado-libre/profile', checkCookieCredentials, getMercadoLibreProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)
router.get('/mercado-libre/categories/:id', getMercadoLibreChildCategories)
router.get('/mercado-libre/product-types', getMercadoLibrePostTypes)
router.get('/mercado-libre/items', getMercadoLibreItems)
router.get('/mercado-libre/product', checkCookieCredentials, getMercadoLibreUserProducts)
router.get('/mercado-libre/publish', createMercadoLibrePublication)
router.get('/mercado-libre/publishTest', createMercadoLibrePublicationTest)
router.get('/mercado-libre/close', closeMercadoLibrePublication)
router.get('/mercado-libre/delete', deleteMercadoLibrePublication)
router.get('/mercado-libre/questions', getMercadoLibreQuestionsAll)

// user controller
router.post('/login', validateLogin, login)
router.post('/register', validateRegister, register)
router.post('/add-mercadolibre-app', checkCookieCredentials, addNewMercadoLibreApp)
router.get('/validate-session', checkCookieCredentials, validateApp)
router.get('/profile', checkCookieCredentials, getUserProfile)

export default router
