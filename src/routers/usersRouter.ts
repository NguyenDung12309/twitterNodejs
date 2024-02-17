import { Router } from 'express'
import { loginController, registerController } from '@/controllers/usersController'
import { loginMiddleware } from '@/middlewares/usersMiddleware'
import { wrapRequestHandler } from '@/utils/helper'
import { registerValidator } from '@/middlewares/validates/userRegister'
import { validate } from '@/middlewares/validateMiddleware'

export const usersRouter = Router()

usersRouter.post('/login', loginMiddleware, loginController)
usersRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))
