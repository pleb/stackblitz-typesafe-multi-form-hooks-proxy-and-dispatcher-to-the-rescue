import { useRef, useCallback } from 'react'

// Ref: https://stackoverflow.com/a/54159564
export const useFocus = <T extends HTMLElement>() => {
  const htmlElRef = useRef<T>(null)
  const setFocus = useCallback(() => {
    htmlElRef?.current?.focus()
  }, [htmlElRef])
  return [htmlElRef, setFocus] as const
}
