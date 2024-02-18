import { checkSchema } from 'express-validator'
import { userService } from '@/services/usersServices'
import { USER_MESSAGE } from '@/constants/message'

export const registerValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: USER_MESSAGE.NAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USER_MESSAGE.NAME_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: USER_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    },
    trim: true
  },
  email: {
    notEmpty: {
      errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: USER_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await userService.findUser(value)
        if (isExistEmail) {
          throw new Error(USER_MESSAGE.EMAIL_ALREADY_EXISTS)
        }
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 6,
        max: 50
      },
      errorMessage: USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    }
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        console.log({ value, pass: req.body.password })

        if (value !== req.body.password) {
          throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
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
      errorMessage: USER_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  }
})
