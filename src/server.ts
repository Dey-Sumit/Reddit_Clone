import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import trim from './middlewares/trim'

import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/sub'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(trim)
app.use(cookieParser())
app.use(
   cors({
      credentials: true,
      origin: process.env.ORIGIN,
      optionsSuccessStatus: 200,
   })
)

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subRoutes)

app.listen(PORT, async () => {
   console.log(`Server running on PORT ${PORT}`)
   try {
      await createConnection()
      console.log('Database Connected')
   } catch (error) {
      console.log(error)
   }
})
