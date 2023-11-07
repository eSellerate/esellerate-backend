export const checkCookieCredentials = async (req, res, next) => {
  // get session id from cookies
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({
      message: 'No has iniciado sesión.'
    })
    return
  }
  // extract bearer token
  const sid = authorization.split(' ')[1]
  req.sid = sid
  // get session from database
  try {
    req.user = await req.sessionStore.get(sid)
    if (!req.user) {
      res.status(401).json({
        message: 'No se encontró la sesión.'
      })
      return
    }
    next()
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrió un error al validar la sesión, intente nuevamente.'
    })
  }
}
