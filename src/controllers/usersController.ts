import { Controller } from '~/models/middlewares'

export const loginController: Controller = (req, res) => {
  res.status(200).json({
    message: 'login sucess'
  })
}
