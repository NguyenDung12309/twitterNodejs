import { Router } from 'express'
import { loginController, registerController } from '@/controllers/usersController'
import { wrapRequestHandler } from '@/utils/helper'
import { registerValidator } from '@/middlewares/validates/userRegister'
import { validate } from '@/middlewares/validateMiddleware'
import { loginValidator } from '@/middlewares/validates/userLogin'

export const authRouter = Router()

authRouter.post('/login', validate(loginValidator), wrapRequestHandler(loginController))
authRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))
authRouter.post('/logout')
