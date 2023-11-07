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

/**
 * @description Validator for register
 */
export const validateRegister = [
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
      if (user) {
        throw new Error('El email ya está registrado')
      }
    }),

  body('password')
    .notEmpty()
    .withMessage('No se ha ingresado una contraseña'),

  body('confirmPassword')
    .notEmpty()
    .withMessage('No se ha ingresado una contraseña')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Las contraseñas no coinciden')
      }
      return true
    }),

  body('firstName')
    .notEmpty()
    .withMessage('No se ha ingresado un nombre')
    .isAlpha()
    .withMessage('El nombre solo puede contener letras'),

  body('lastName')
    .notEmpty()
    .withMessage('No se ha ingresado un apellido')
    .isAlpha()
    .withMessage('El apellido solo puede contener letras')
]
