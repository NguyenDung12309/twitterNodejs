import { Router } from 'express'
import { loginController, registerController } from '@/controllers/usersController'
import { wrapRequestHandler } from '@/utils/helper'
import { registerValidator } from '@/middlewares/validates/userRegister'
import { validate } from '@/middlewares/validateMiddleware'
import { loginValidator } from '@/middlewares/validates/userLogin'

export const usersRouter = Router()

usersRouter.post('/login', validate(loginValidator), wrapRequestHandler(loginController))
usersRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))
