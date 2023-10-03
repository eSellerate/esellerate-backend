import { Router } from 'express'

// import controllers
import {
  getProfile,
  getMercadoLibreCategories,
  getMercadoLibreChildCategories,
  getMercadoLibrePostTypes
} from '../controllers/example.controller.js'

const router = Router()

router.get('/mercado-libre/profile', getProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)
router.get('/mercado-libre/categories/:id', getMercadoLibreChildCategories)
router.get('/mercado-libre/product-types', getMercadoLibrePostTypes)

export default router
