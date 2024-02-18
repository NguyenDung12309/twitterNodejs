import { USER_MESSAGE } from '@/constants/message'
import { Controller } from '@/models/middlewares'
import { reqUserLogin, reqUserRegister } from '@/models/requests/usersRequest'
import { userService } from '@/services/usersServices'

export const loginController: Controller<reqUserLogin> = async (req, res) => {
  const { user } = req
  const { _id } = user

  const { accessToken, refreshToken } = await userService.login(_id)
  res.status(200).json({
    message: USER_MESSAGE.LOGIN_SUCCESS,
    accessToken,
    refreshToken
  })
}

export const registerController: Controller<reqUserRegister> = async (req, res) => {
  const { accessToken, refreshToken } = await userService.register(req.body)
  res.status(200).json({
    message: USER_MESSAGE.REGISTER_SUCCESS,
    accessToken,
    refreshToken
  })
}
