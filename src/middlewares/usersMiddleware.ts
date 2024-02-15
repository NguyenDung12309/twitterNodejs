import { MiddleWare } from '@/models/middlewares'

export const loginMiddleware: MiddleWare = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'email and password are required'
    })
  }
  next()
}
