import { useRef } from 'react'

export const useFormReset = <T extends HTMLFormElement>() => {
  const htmlElRef = useRef<T>(null)
  const resetForm = () => {
    htmlElRef?.current?.reset()
  }
  return [htmlElRef, resetForm] as const
}
