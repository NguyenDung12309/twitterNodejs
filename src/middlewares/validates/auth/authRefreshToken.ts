import { checkSchema } from 'express-validator'
import { AUTH_MESSAGE } from '@/constants/message'
import { verifyToken } from '@/utils/jwt'
import { ErrorWithStatus } from '@/models/errorModels'
import { HTTP_STATUS } from '@/constants/common'
import { databaseService } from '@/services/databaseService'
import { JsonWebTokenError } from 'jsonwebtoken'
import { TokenPayload } from '@/models/accessToken'

export const refreshTokenValidator = checkSchema(
  {
    refreshToken: {
      notEmpty: {
        errorMessage: AUTH_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
      },
      custom: {
        options: async (value: string, { req }) => {
          try {
            const [decodeRefreshToken, refreshToken] = await Promise.all([
              verifyToken<TokenPayload>({ token: value }),
              databaseService.refreshToken.findOne({ token: value })
            ])

            if (!refreshToken) {
              throw new ErrorWithStatus({
                message: AUTH_MESSAGE.REFRESH_TOKEN_NOT_EXIST,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }

            req.decodeRefreshToken = decodeRefreshToken
          } catch (error) {
            if (error instanceof JsonWebTokenError) {
              throw new ErrorWithStatus({
                message: AUTH_MESSAGE.REFRESH_TOKEN_INVALID,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            throw error
          }
          return true
        }
      }
    }
  },
  ['body']
)
