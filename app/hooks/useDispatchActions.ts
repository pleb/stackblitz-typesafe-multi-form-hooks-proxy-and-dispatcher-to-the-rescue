import { Validator } from 'remix-validated-form'
import { DispatchActionsLookup } from '~/utilities/dispatcher'
import { createObjectFieldsProxy } from '~/utilities/object-field-proxy'

export function useDispatchActions<T extends Validator<any>>(
  _validator: T,
): DispatchActionsLookup<T> {
  return createObjectFieldsProxy<T>()
}
