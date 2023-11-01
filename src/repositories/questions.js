import axios from 'axios'
import HandleAxiosResponse from '../utilities/HandleAxiosResponse.js'

import 'dotenv/config'

const baseUrl = 'https://api.mercadolibre.com'

export const getQuestionsAll = async () => {
    try {
        const url = baseUrl + '/questions/search?seller_id=' + process.env.SELLER_ID
        if (data.hasOwnProperty("sort_fields")) {
            url = url + data.sort_fields;
        }
        if (data.hasOwnProperty("sort_types")) {
            url = url + data.sort_types;
        }
        url = url + '&api_version=4'
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

export const getQuestionsFromItem = async (data) => {
    try {
        const url = baseUrl + `/questions/search?item=${data.itemID}`
        if (data.hasOwnProperty("sort_fields")) {
            url = url + data.sort_fields
        }
        if (data.hasOwnProperty("sort_types")) {
            url = url + data.sort_types
        }
        url = url + '&api_version=4'
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

export const getQuestion = async (QUESTION_ID) => {
    try {
        const url = baseUrl + `/questions/${QUESTION_ID}?api_version=4`
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

export const deleteQuestion = async (QUESTION_ID) => {
    try {
        const url = baseUrl + `/questions/${QUESTION_ID}`
        const options = {
            headers: {
                Authorization: process.env.TOKEN,
            },
        }
        const response = await axios.delete(url, options)
        return HandleAxiosResponse.handleSuccess(response)
    } catch (error) {
        return HandleAxiosResponse.handleError(error)
    }
}

export const createAnswerByQuestionID = async (data) => {
    try {
        const url = baseUrl + `/answers/`
        const options = {
            headers: {
                Authorization: process.env.TOKEN,
                'Content-Type': 'application/json',
            },
        }
        const response = await axios.post(url, data, options)
        return HandleAxiosResponse.handleSuccess(response)
    } catch (error) {
        return HandleAxiosResponse.handleError(error)
    }
}