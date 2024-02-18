import { HTTP_STATUS } from '@/constants/common'
import { ErrorWithStatus } from '@/models/errorModels'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(err)
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    err: err.message
  })
}
