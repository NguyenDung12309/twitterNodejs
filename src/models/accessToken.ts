import { TokenTypes } from '@/enum/token'

export interface JwtDecode<T> {
  type_token: TokenTypes
  data: T
  iat: number
  exp: number
}

export interface TokenPayload {
  userId: string
}
