import express from 'express'
import { userRouter } from './routers/user'

const app = express()
const port = 3000
app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter)

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})