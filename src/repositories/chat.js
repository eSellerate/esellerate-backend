import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

const baseUrl = 'https://api.mercadolibre.com'

export const getQuestionsAll = async () => {
  try {
    const url = baseUrl + '/questions/search?seller_id=$'+process.env.SELLER_ID+'&api_version=4'
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}

export const getQuestionsFromItem = async () => {
  try {
    const url = baseUrl + 'search?item=$ITEM_ID'+process.env.SELLER_ID+'&api_version=4'
    const options = {
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
    const response = await axios.get(url, options)
    return HandleAxiosResponse.handleSuccess(response)
  } catch (error) {
    return HandleAxiosResponse.handleError(error)
  }
}