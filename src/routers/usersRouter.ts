import { Router } from 'express'
import { loginController } from '~/controllers/usersController'
import { loginMiddleware } from '~/middlewares/usersMiddleware'

export const usersRouter = Router()

usersRouter.post('/login', loginMiddleware, loginController)
