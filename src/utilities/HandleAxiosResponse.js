export default class HandleAxiosResponse {
  static handleError (error) {
    console.log(error)
    const { data } = error.response
    return data
  }

  static handleSuccess (success) {
    const { status, data } = success
    return { status, data }
  }
}
