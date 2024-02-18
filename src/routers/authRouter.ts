import { Router } from 'express'
import { wrapRequestHandler } from '@/utils/helper'
import { validate } from '@/middlewares/validateMiddleware'
import { loginValidator } from '@/middlewares/validates/authLogin'
import { registerValidator } from '@/middlewares/validates/authRegister'
import { loginController, logoutController, registerController } from '@/controllers/authController'
import { accessTokenValidator } from '@/middlewares/validates/authAccessToken'

export const authRouter = Router()

authRouter.post('/login', validate(loginValidator), wrapRequestHandler(loginController))
authRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))
authRouter.post('/logout', validate(accessTokenValidator), wrapRequestHandler(logoutController))
