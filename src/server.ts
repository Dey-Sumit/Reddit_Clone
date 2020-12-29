import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth'
import trim from './middlewares/trim'

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(trim)

app.get('/', (_, res) => res.send('Hello World'))
app.use('/api/auth', authRoutes)

app.listen(5000, async () => {
   console.log('Server running on PORT 5000')
   try {
      await createConnection()
      console.log('Database Connected')
   } catch (error) {
      console.log(error)
   }
})
