export const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
      return next()
  }
  res.status(409).json({
      message: err.message
  })
}