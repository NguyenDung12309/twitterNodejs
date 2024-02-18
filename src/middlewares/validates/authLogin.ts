import { checkSchema } from 'express-validator'
import { AUTH_MESSAGE } from '@/constants/message'
import { databaseService } from '@/services/databaseService'
import { hashString } from '@/utils/crypto'

export const loginValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: AUTH_MESSAGE.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: AUTH_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseService.users.findOne({ email: value, password: hashString(req.body.password) })

        if (!user) {
          throw new Error(AUTH_MESSAGE.EMAIL_PASSWORD_NOT_FOUND)
        }

        req.user = user
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: AUTH_MESSAGE.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: AUTH_MESSAGE.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 6,
        max: 50
      },
      errorMessage: AUTH_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    }
  }
})
