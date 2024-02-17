import { EntityError } from './../models/errorModels'
import { HTTP_STATUS } from '@/constants/common'
import { ErrorWithStatus } from '@/models/errorModels'
import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  // Return an asynchronous function that takes in the request, response, and next function
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Run the validation on the request
    await validation.run(req)
    // Get the validation errors
    const errors = validationResult(req)

    // If there are no errors, call the next middleware function
    if (errors.isEmpty()) {
      return next()
    }

    // If there are errors, map them to a more readable format
    const errorsObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })
    for (const key in errorsObject) {
      const { msg } = errorsObject[key]
      // If the error is a custom error with a specific status code, return it immediately
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      // Otherwise, add the error message to the entityError object
      entityError.errors[key] = errorsObject[key]
    }

    // If there are errors that are not custom, pass the entityError to the next middleware function
    next(entityError)
  }
}
