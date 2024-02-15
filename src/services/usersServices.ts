import { userRegister } from '@/models/requests/usersRequest'
import { databaseService } from './databaseService'
import { User } from '@/models/schemas/usersSchema'

class UsersService {
  async register(payload: userRegister) {
    return await databaseService.users.insertOne(new User(payload))
  }
}

export const userService = new UsersService()
