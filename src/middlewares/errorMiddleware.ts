import { HTTP_STATUS } from '@/constants/common'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err)
}
