import { reqUserRegister } from '@/models/requests/usersRequest'
import { databaseService } from './databaseService'
import { User } from '@/models/schemas/usersSchema'

class UsersService {
  async register(payload: reqUserRegister) {
    return await databaseService.users.insertOne(new User(payload))
  }

  async checkEmailExists(email: string, { message }: { message: any }) {
    try {
      const isExistEmail = await databaseService.users.findOne({ email })

      if (isExistEmail) {
        return message({
          external: 'email exist'
        })
      }
    } catch (error) {
      return message({
        external: 'Server error'
      })
    }
  }
}

export const userService = new UsersService()
