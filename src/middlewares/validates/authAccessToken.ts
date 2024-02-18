import { checkSchema } from 'express-validator'
import { AUTH_MESSAGE } from '@/constants/message'
import { verifyToken } from '@/utils/jwt'
import { ErrorWithStatus } from '@/models/errorModels'
import { HTTP_STATUS } from '@/constants/common'

export const accessTokenValidator = checkSchema(
  {
    Authorization: {
      custom: {
        options: async (value: string, { req }) => {
          const accessToken = value.split(' ')[1]

          if (!accessToken) {
            throw new ErrorWithStatus({
              message: AUTH_MESSAGE.ACCESS_TOKEN_IS_REQUIRED,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }

          const decodeAuth = await verifyToken({ token: accessToken })
          req.decodeAuth = decodeAuth
          return true
        }
      }
    }
  },
  ['headers']
)
