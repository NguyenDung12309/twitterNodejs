import { createHash } from 'crypto'
import 'dotenv/config'

export const hashString = (content: string) => {
  return createHash('sha256')
    .update(content + process.env.SECRET_PW)
    .digest('hex')
}
