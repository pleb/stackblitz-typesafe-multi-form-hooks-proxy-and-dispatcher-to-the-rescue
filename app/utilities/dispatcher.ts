import type { DataFunctionArgs } from '@remix-run/node'
import type { SuccessResult, Validator } from 'remix-validated-form'
import { validationError } from 'remix-validated-form'
import {
  CoerceIntellisense,
  ExtractGeneric,
  TypeWithGeneric,
} from '~/utilities/type-helpers'

type ZodActionType = Validator<{ _action: string }>

type ExtractZodUnion<T extends ZodActionType> = Extract<
  Awaited<ReturnType<ExtractGeneric<TypeWithGeneric<T>>['validate']>>,
  SuccessResult<unknown>
>['data']

type DispatchActions<T extends { _action: string }> = {
  [P in T['_action']]: (
    data: CoerceIntellisense<Extract<T, { _action: P }>>,
  ) => Promise<unknown>
}

export type DispatchActionsLookup<T extends ZodActionType> = {
  [P in ExtractZodUnion<T>['_action']]: `${P}`
}

/**
 * Is a small action dispatcher which can be use for multi-forms (single button forms) in a remix app.
 *
 * @example <caption>Single action</caption>
 *
 * const validatorS = withZod(
 *   z.object({
 *     _action: z.literal('single-action'),
 *     propA: z.string(),
 *     propB: z.number(),
 *   })
 * )
 *
 * export const actionS = async (data: DataFunctionArgs) => {
 *   return await dispatch(data, validatorS, {
 *     "single-action": (result) => {
 *       console.log(result.propA, result.propB)
 *       return Promise.resolve()
 *     },
 *   })
 * }
 *
 * @example <caption>Multi action</caption>
 *
 * const validatorS = withZod(
 *   z.discriminatedUnion('_action', [
 *     z.object({
 *       _action: z.literal('action-one'),
 *       propA: z.string(),
 *       propB: z.number(),
 *     }),
 *     z.object({
 *       _action: z.literal('action-two'),
 *       propC: z.string(),
 *       propD: z.number(),
 *     })
 *   ]),
 * )
 *
 * export const actionS = async (data: DataFunctionArgs) => {
 *   return await dispatch(data, validatorS, {
 *     "action-one": (result) => {
 *       console.log(result.propA, result.propB)
 *       return Promise.resolve()
 *     },
 *    "action-two": (result) => {
 *       console.log(result.propB, result.propC)
 *       return Promise.resolve()
 *     },
 *   })
 * }
 */
export async function dispatch<Validator extends ZodActionType>(
  data: DataFunctionArgs,
  validator: Validator,
  actions: DispatchActions<ExtractZodUnion<Validator>>,
) {
  const formData = await data.request.formData()
  const result = await validator.validate(formData)

  if (result.error) return validationError(result.error)

  if (!Object.keys(actions).includes(result.data._action))
    throw new Error(`No action handler declared for ${result.data._action}`)

  return (await (actions as any)[result.data._action](result.data)) ?? null
}
