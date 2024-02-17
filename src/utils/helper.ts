import { MiddleWare } from './../models/middlewares'
import { RequestHandler } from 'express'
import { pick } from 'lodash'

export const objectAssign = (data: object, source: any): void => {
  const filteredData = pick(data, Object.keys(source))

  Object.assign(source, filteredData)
}

export const wrapRequestHandler = (func: RequestHandler): MiddleWare => {
  return async (req, res, next) => {
    try {
      await func(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
