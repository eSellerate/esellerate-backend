import { validationResult } from 'express-validator'

const checkValidations = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Ocurrió un error al valiadar los datos',
      errors: errors.array()
    })
    return true // Indicate that there were errors
  }
  return false // Indicate that there were no errors
}

export default checkValidations
