import { reqUserRegister } from '@/models/requests/usersRequest'
import { databaseService } from './databaseService'
import { User } from '@/models/schemas/usersSchema'
import { hashString } from '@/utils/crypto'
import { signToken } from '@/utils/jwt'
import { TokenTypes } from '@/enum/token'
import { RefreshToken } from '@/models/schemas/RefreshTokenSchema'
import { ObjectId } from 'mongodb'

class UsersService {
  private async signRefreshToken(userId: string) {
    return await signToken({
      payload: {
        type_token: TokenTypes.RefreshToken,
        data: {
          userId
        }
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
      }
    })
  }
  private async signAccessToken(userId: string) {
    return await signToken({
      payload: {
        type_token: TokenTypes.AccessToken,
        data: {
          userId
        }
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
      }
    })
  }

  private async signAccessAndRefreshToken(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([this.signAccessToken(userId), this.signRefreshToken(userId)])

    return {
      accessToken,
      refreshToken
    }
  }

  async register(payload: reqUserRegister) {
    const data = await databaseService.users.insertOne(
      new User({
        ...payload,
        password: hashString(payload.password),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    )

    const userId = data.insertedId.toString()

    const { accessToken, refreshToken } = await this.signAccessAndRefreshToken(userId)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ userId: new ObjectId(userId), token: refreshToken })
    )
    return {
      accessToken,
      refreshToken
    }
  }

  async login(userId: string) {
    const { accessToken, refreshToken } = await this.signAccessAndRefreshToken(userId)

    await databaseService.refreshToken.insertOne(
      new RefreshToken({ userId: new ObjectId(userId), token: refreshToken })
    )
    return {
      accessToken,
      refreshToken
    }
  }

  async findUser(email: string) {
    const result = await databaseService.users.findOne({ email })

    return result
  }
}
export const userService = new UsersService()
