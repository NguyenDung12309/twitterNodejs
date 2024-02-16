import { reqUserRegister } from '@/models/requests/usersRequest'
import { userService } from '@/services/usersServices'
import { dateRequired, emailRequired, joi, stringMinMaxRequired } from '@/utils/validate'

export const registerSchema = joi.object<reqUserRegister>({
  name: stringMinMaxRequired({ min: 1, max: 255 }),
  email: emailRequired().external(userService.checkEmailExists),
  dateOfBirth: dateRequired(),
  password: stringMinMaxRequired({ min: 6, max: 50 }),
  confirmPassword: joi.valid(joi.ref('password')).messages({
    'any.only': '{#key} must match password'
  })
})
