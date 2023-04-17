import { createContext, useContext } from 'react'

export type LoadingContextObject = {
  isLoading: boolean
}

export const LoadingContext = createContext<LoadingContextObject>({
  isLoading: false,
})

export const useLoadingContext = () => useContext(LoadingContext)
