import { NextFunction, Request, Response } from 'express'

export const errorController = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({ error: err.message })
}
