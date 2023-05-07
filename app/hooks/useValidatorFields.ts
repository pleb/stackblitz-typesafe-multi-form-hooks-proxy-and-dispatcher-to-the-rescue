import type { Validator } from 'remix-validated-form'
import { createObjectFieldsProxy } from '~/utilities/object-field-proxy'

type ValidatorModelType<T extends Validator<any>> = T extends Validator<
  infer TModel
>
  ? TModel
  : never

export const useValidatorFields = <T extends Validator<any>>(_validator: T) =>
  createObjectFieldsProxy<ValidatorModelType<T>>()
