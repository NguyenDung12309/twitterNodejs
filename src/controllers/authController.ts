import { AUTH_MESSAGE } from '@/constants/message'
import { Controller } from '@/models/middlewares'
import { reqUserLogin, reqUserRegister } from '@/models/requests/usersRequest'
import { authService } from '@/services/authServices'

export const loginController: Controller<reqUserLogin> = async (req, res) => {
  const { user } = req
  const { _id } = user

  const { accessToken, refreshToken } = await authService.login(_id)
  res.status(200).json({
    message: AUTH_MESSAGE.LOGIN_SUCCESS,
    accessToken,
    refreshToken
  })
}

export const registerController: Controller<reqUserRegister> = async (req, res) => {
  const { accessToken, refreshToken } = await authService.register(req.body)
  res.status(200).json({
    message: AUTH_MESSAGE.REGISTER_SUCCESS,
    accessToken,
    refreshToken
  })
}

export const logoutController: Controller<reqUserRegister> = async (req, res) => {
  res.status(200).json({
    message: 'logout success'
  })
}
