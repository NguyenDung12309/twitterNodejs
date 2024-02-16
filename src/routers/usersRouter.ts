import { Router } from 'express'
import { loginController, registerController } from '@/controllers/usersController'
import { loginMiddleware } from '@/middlewares/usersMiddleware'
import { validatorMiddleWare } from '@/middlewares/validateMiddleware'

export const usersRouter = Router()

usersRouter.post('/login', loginMiddleware, loginController)
usersRouter.post('/register', validatorMiddleWare('registerSchema'), registerController)
