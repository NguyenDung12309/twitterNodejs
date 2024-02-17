import { Controller } from '@/models/middlewares'
import { reqUserRegister } from '@/models/requests/usersRequest'
import { User } from '@/models/schemas/usersSchema'
import { userService } from '@/services/usersServices'

export const loginController: Controller<User> = (req, res) => {
  res.status(200).json({
    message: 'login sucess'
  })
}

export const registerController: Controller<reqUserRegister> = async (req, res) => {
  const { accessToken, refreshToken } = await userService.register(req.body)
  res.status(200).json({
    message: 'register sucess',
    accessToken,
    refreshToken
  })
}
