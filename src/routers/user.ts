import { Router } from 'express'

export const userRouter = Router()

userRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
})

userRouter.get('/tweets', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        text: 'hello world'
      }
    ]
  })
})
