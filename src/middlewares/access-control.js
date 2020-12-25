export const accessControlMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
      'Access-Control-Allow-Headers',
      'x-requested-with,content-type,authorization,x-token,x-refresh-token'
  )
  res.setHeader('Access-Control-Allow-Credentials', false)
  if (req.method === 'OPTIONS') {
      // === CORS ===
      res.status(200).send('HEAD')
  } else {
      next()
  }
}