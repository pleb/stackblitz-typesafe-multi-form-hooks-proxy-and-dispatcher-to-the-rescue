import { useContext } from 'react'
import { LoadingContext } from '~/contexts/loading-context'

export const useLoadingContext = () => useContext(LoadingContext)
