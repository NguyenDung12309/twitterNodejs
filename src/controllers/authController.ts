import { AUTH_MESSAGE } from '@/constants/message'
import { Controller } from '@/models/middlewares'
import { reqAuthLogin, reqAuthLogout, reqAuthRegister } from '@/models/requests/authRequest'
import { authService } from '@/services/authServices'

export const loginController: Controller<reqAuthLogin> = async (req, res) => {
  const { user } = req
  const { _id } = user

  const { accessToken, refreshToken } = await authService.login(_id)
  res.status(200).json({
    message: AUTH_MESSAGE.LOGIN_SUCCESS,
    accessToken,
    refreshToken
  })
}

export const registerController: Controller<reqAuthRegister> = async (req, res) => {
  const { accessToken, refreshToken } = await authService.register(req.body)
  res.status(200).json({
    message: AUTH_MESSAGE.REGISTER_SUCCESS,
    accessToken,
    refreshToken
  })
}

export const logoutController: Controller<reqAuthLogout> = async (req, res) => {
  authService.logout(req.body.refreshToken)
  res.status(200).json({
    message: AUTH_MESSAGE.LOGOUT_SUCCESS
  })
}
