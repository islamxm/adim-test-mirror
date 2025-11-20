import { createContext } from "react"

export type InitStateType = {
  animate: boolean
}

const initState: InitStateType = {
  animate: true
}

export const AnimationContext = createContext<InitStateType>(initState)





