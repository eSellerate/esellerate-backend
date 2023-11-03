export const checkCookieCredentials = async (req, res, next) => {
  // get session id from cookie
  const { authorization } = req.headers
  console.log(authorization)
  if (!req.headers.cookie) {
    res.status(401).json({
      message: 'No has iniciado sesión.'
    })
    return
  }
  const cookies = req.headers.cookie.split(';')
  const userCookie = cookies.find(cookie => cookie.includes('user-cookie'))
  if (!userCookie) {
    res.status(401).json({
      message: 'No has iniciado sesión.'
    })
    return
  }
  // extract session id
  const sid = userCookie.split('=')[1]
  // get session from database
  try {
    req.user = await req.sessionStore.get(sid)
    next()
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error al validar la sesión, intente nuevamente.'
    })
  }
}
