export type CoerceIntellisense<T> = T extends infer O
  ? { [K in keyof O]: O[K] }
  : never

export type TypeWithGeneric<T> = T[]

export type ExtractGeneric<Type> = Type extends TypeWithGeneric<infer X>
  ? X
  : never
