import { checkSchema } from 'express-validator'
import { AUTH_MESSAGE } from '@/constants/message'
import { verifyToken } from '@/utils/jwt'
import { ErrorWithStatus } from '@/models/errorModels'
import { HTTP_STATUS } from '@/constants/common'
import { TokenPayload } from '@/models/accessToken'

export const accessTokenValidator = checkSchema(
  {
    Authorization: {
      custom: {
        options: async (value: string, { req }) => {
          try {
            const formatToken = value.split(' ')[1]
            const decodeAccessToken = await verifyToken<TokenPayload>({ token: formatToken })

            req.decodeAccessToken = decodeAccessToken
          } catch (error) {
            throw new ErrorWithStatus({
              message: AUTH_MESSAGE.ACCESS_TOKEN_INVALID,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
        }
      }
    }
  },
  ['headers']
)
