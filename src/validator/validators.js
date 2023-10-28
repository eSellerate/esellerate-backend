// express-validator
import { body } from 'express-validator'
// models
import User from '../models/User.js'

/**
 * @description Validator for login
 */
export const validateLogin = [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('El email no es válido')
    .custom(async email => {
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        throw new Error('El email no está registrado')
      }
    }),

  body('password')
    .notEmpty()
    .withMessage('No se ha ingresado una contraseña')
]
