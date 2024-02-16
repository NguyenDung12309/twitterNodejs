import { Controller } from '@/models/middlewares'
import { reqUserRegister } from '@/models/requests/usersRequest'
import { User } from '@/models/schemas/usersSchema'
import { databaseService } from '@/services/databaseService'
import { userService } from '@/services/usersServices'

export const loginController: Controller<User> = (req, res) => {
  res.status(200).json({
    message: 'login sucess'
  })
}

export const registerController: Controller<reqUserRegister> = async (req, res) => {
  try {
    await userService.register(req.body)
    res.status(200).json({
      message: 'register sucess'
    })
  } catch (err) {
    console.log(err)

    res.status(400).json({
      message: 'register fail',
      err
    })
  }
}
