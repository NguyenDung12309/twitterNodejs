import express from 'express'
import { databaseService } from './services/databaseService'
import { errorHandler } from './middlewares/errorMiddleware'
import { authRouter } from './routers/authRouter'

const app = express()
const port = 3000

app.use(express.json())
databaseService.connect()

app.use('/api/auth', authRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
