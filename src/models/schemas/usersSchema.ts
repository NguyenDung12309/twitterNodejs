import { objectAssign } from '@/utils/helper'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '@/enum/user'

export interface Follower {
  _id: string
  user_id: string
  followed_user_id: string
  created_at: string
}

export class User {
  _id: ObjectId
  name: string
  email: string
  dateOfBirth: Date
  password: string
  createdAt: Date
  updatedAt: Date
  emailVerifyToken: string
  forgotPasswordToken: string
  verify: UserVerifyStatus = UserVerifyStatus.Unverified
  bio: string
  location: string
  website: string
  username: string
  avatar: string
  coverPhoto: string

  constructor(data: Partial<User>) {
    objectAssign(data, this)
  }
}
