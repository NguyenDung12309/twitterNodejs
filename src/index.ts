import express from 'express'
import { usersRouter } from './routers/usersRouter'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
