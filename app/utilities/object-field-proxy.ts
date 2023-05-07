import type { UnionToIntersection } from 'type-fest'

type MapKeys<T> = T extends any
  ? {
    [key in keyof Required<T>]-?: key
  }
  : never

type PropertyFields<T> = UnionToIntersection<MapKeys<T>>

export function createObjectFieldsProxy<T extends object>(): PropertyFields<T> {
  return new Proxy(
    {},
    {
      get(target: T, property: string | symbol): any {
        return property
      },
    },
  ) as PropertyFields<T>
}
