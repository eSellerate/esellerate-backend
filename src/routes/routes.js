import { Router } from 'express'

// import controllers
import { getProfile, getMercadoLibreCategories } from '../controllers/example.controller.js'

const router = Router()

router.get('/mercado-libre/profile', getProfile)
router.get('/mercado-libre/categories', getMercadoLibreCategories)

export default router
