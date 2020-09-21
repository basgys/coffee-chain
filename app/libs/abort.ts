import React, { useContext } from 'react'
import AbortController from "abort-controller"

export interface IAbortContext {
  abortController: AbortController
  abort: () => void
}

export const AbortContext = React.createContext<IAbortContext>({
  abortController: null!,
  abort: () => {}
});

export const useAbort = () => {
  return useContext(AbortContext)
}
