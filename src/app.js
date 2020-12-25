import express from 'express'
import bodyParser from 'body-parser'
import { errorMiddleware, accessControlMiddleware } from './middlewares'
import config from './config'
import routeIndicators from './routes/indicators'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(accessControlMiddleware)
app.use('/indicators', routeIndicators)
app.use(errorMiddleware)

app.listen(config.port || 8000, () => {
  console.log(`Starting port ${config.port || 8000}`)
})
