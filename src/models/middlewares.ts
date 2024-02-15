import { NextFunction, Request, Response } from 'express'

export type MiddleWare = (req: Request, res: Response, next: NextFunction) => void
export type Controller = (req: Request, res: Response) => void
