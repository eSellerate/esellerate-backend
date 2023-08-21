import { Router } from 'express'

// import controllers
import { sayHello } from '../controllers/example.controller.js'

const router = Router()

router.get('/', sayHello)

export default router
