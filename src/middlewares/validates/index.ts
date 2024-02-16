import { reqUserRegister } from '@/models/requests/usersRequest'
import { registerSchema } from './userRegister'
import { ObjectSchema } from 'joi'

export interface IValidators {
  registerSchema: ObjectSchema<reqUserRegister>
}

export const validators: IValidators = {
  registerSchema
}
