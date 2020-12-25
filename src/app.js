import express from 'express'
import bodyParser from 'body-parser'
import accessControlMiddleware from './middlewares/access-control'
import config from './config'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(accessControlMiddleware)

app.listen((config.port || 8000), () => {
  console.log(`Starting port ${config.port || 8000}`)
})