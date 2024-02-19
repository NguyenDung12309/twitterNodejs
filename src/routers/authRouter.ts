import { Router } from 'express'
import { wrapRequestHandler } from '@/utils/helper'
import { validate } from '@/middlewares/validateMiddleware'
import { loginController, logoutController, registerController } from '@/controllers/authController'
import { loginValidator } from '@/middlewares/validates/auth/authLogin'
import { registerValidator } from '@/middlewares/validates/auth/authRegister'
import { accessTokenValidator } from '@/middlewares/validates/auth/authAccessToken'
import { refreshTokenValidator } from '@/middlewares/validates/auth/authRefreshToken'

export const authRouter = Router()

authRouter.post('/login', validate(loginValidator), wrapRequestHandler(loginController))
authRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))
authRouter.post(
  '/logout',
  validate(accessTokenValidator),
  validate(refreshTokenValidator),
  wrapRequestHandler(logoutController)
)
