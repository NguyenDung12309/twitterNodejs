import { checkSchema } from 'express-validator'
import { authService } from '@/services/authServices'
import { AUTH_MESSAGE } from '@/constants/message'

export const registerValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: AUTH_MESSAGE.NAME_IS_REQUIRED
    },
    isString: {
      errorMessage: AUTH_MESSAGE.NAME_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: AUTH_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    },
    trim: true
  },
  email: {
    notEmpty: {
      errorMessage: AUTH_MESSAGE.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: AUTH_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await authService.findUser(value)
        if (isExistEmail) {
          throw new Error(AUTH_MESSAGE.EMAIL_ALREADY_EXISTS)
        }
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
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(AUTH_MESSAGE.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
        }
        return true
      }
    }
  },
  dateOfBirth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      },
      errorMessage: AUTH_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  }
})
