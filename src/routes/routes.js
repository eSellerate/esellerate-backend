import { Router } from 'express'

// import controllers
import {
  getProfile,
  getMercadoLibreCategories,
  getMercadoLibreChildCategories,
  getMercadoLibrePostTypes,
  getMercadoLibreItems,
  getMercadoLibreUserProducts
} from '../controllers/example.controller.js'

const router = Router()

router.get('/mercado-libre/profile', getProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)
router.get('/mercado-libre/categories/:id', getMercadoLibreChildCategories)
router.get('/mercado-libre/product-types', getMercadoLibrePostTypes)
router.get('/mercado-libre/items', getMercadoLibreItems)
router.get('/mercado-libre/product', getMercadoLibreUserProducts)

export default router
