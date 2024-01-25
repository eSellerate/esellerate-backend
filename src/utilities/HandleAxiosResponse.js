export default class HandleAxiosResponse {
  static handleError (error) {
    console.trace()
    if (error.response) {
      const { data } = error.response
      console.log(data)
      return data
    }
    console.log(error.message)
    return error
  }

  static handleSuccess (success) {
    if (success.status) {
      const { status, data } = success
      return { status, data }
    }
    return success
  }
}
