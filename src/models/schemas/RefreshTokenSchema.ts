import { ObjectId } from 'mongodb'

export class RefreshToken {
  _id?: ObjectId
  token: string
  createdAt?: Date
  userId: ObjectId

  constructor({ _id, token, createdAt, userId }: RefreshToken) {
    this._id = _id
    this.token = token
    this.createdAt = createdAt || new Date()
    this.userId = userId
  }
}
