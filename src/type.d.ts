import { JwtDecode, TokenPayload } from './models/accessToken'
import { User } from './path/to/user' // Import the User type from your application

//
declare module 'express' {
  interface Request {
    user?: User // Add the 'user' property to the Request interface
    decodeAccessToken?: JwtDecode<TokenPayload>
    decodeRefreshToken?: JwtDecode<TokenPayload>
  }
}
