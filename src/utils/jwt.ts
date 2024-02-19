import { TokenTypes } from '../enum/token'
import jwt, { Algorithm, Secret, SignOptions } from 'jsonwebtoken'
import 'dotenv/config'
import { JwtDecode } from '@/models/accessToken'

class PayloadType {
  type_token: TokenTypes
  data: object
}

export type SignTokenTypes = (data: {
  payload: PayloadType
  privateKey?: Secret
  options?: SignOptions
}) => Promise<string>

export const signToken: SignTokenTypes = ({ payload, privateKey = process.env.SECRET_KEY || '', options }) => {
  const initOptions: SignOptions = {
    algorithm: 'HS256' as Algorithm,
    ...options
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, initOptions, function (err, token) {
      if (err) {
        throw reject(err)
      }

      return resolve(token as string)
    })
  })
}

export const verifyToken = <T>({
  token,
  secretOrPublicKey = process.env.SECRET_KEY || ''
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<JwtDecode<T>>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, function (err, decoded) {
      if (err) {
        throw reject(err)
      }
      resolve(decoded as JwtDecode<T>)
    })
  })
}
