import Joi from 'joi'

export const joi = Joi.defaults((schema) =>
  schema.options({
    messages: {
      'string.empty': '{#key} cannot be blank',
      'string.email': 'The email entered is not valid'
    },
    abortEarly: false
  })
)

export const stringRequired = () => joi.string().required().trim()

export const emailRequired = () => stringRequired().email()

export const stringMinMaxRequired = ({ min, max }: { min: number; max: number }) =>
  stringRequired()
    .min(min)
    .max(max)
    .messages({
      'string.min': `{#key} must be greater than ${min} and less than ${max}`,
      'string.max': `{#key} must be greater than ${min} and less than ${max}`
    })

export const dateRequired = () => joi.date().required()
