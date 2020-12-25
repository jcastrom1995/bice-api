import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  urlApi: process.env.URL_API,
  port: process.env.PORT
}
