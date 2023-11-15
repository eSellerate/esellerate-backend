import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

const baseUrl = 'https://api.mercadolibre.com'

export const getMercadoLibreSellerIDFromToken = (token) => {
  return /[^-]*$/.exec(token)[0];
}

export const getQuestionsAll = async (token) => {
  try {
    const seller_id = getMercadoLibreSellerIDFromToken(token)
    var url = baseUrl + '/questions/search?seller_id=' + seller_id
    url = url + '&sort_fields=date_created,item_id&api_version=4'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getQuestionsFromItem = async (req) => {
  try {
    const url = baseUrl + `/questions/search?item=${req.body.item_id}`
    if (req.body.hasOwnProperty('sort_fields')) {
      url = url + req.body.sort_fields
    }
    if (req.body.hasOwnProperty('sort_types')) {
      url = url + req.body.sort_types
    }
    url = url + '&api_version=4'
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getQuestion = async (req) => {
  try {
    const url = baseUrl + `/questions/${req.body.question_id}?api_version=4`
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const deleteQuestion = async (req) => {
  try {
    const url = baseUrl + `/questions/${req.body.question_id}`
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    }
    const response = await axios.delete(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const createAnswerByQuestionID = async (req) => {
  console.log(req.body)
  try {
    const url = baseUrl + '/answers/'
    const options = {
      headers: {
        Authorization: `Bearer ${req.token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post(url, req.body, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}
