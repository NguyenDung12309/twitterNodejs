import express from 'express'
import { usersRouter } from './routers/usersRouter'
import { databaseService } from './services/databaseService'
import dotenv from 'dotenv'

const app = express()
const port = 3000

app.use(express.json())
databaseService.connect()

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
