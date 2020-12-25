import express from 'express'
import bodyParser from 'body-parser'
import config from './config'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen((config.port || 8000), () => {
  console.log(`Starting port ${config.port || 8000}`)
})