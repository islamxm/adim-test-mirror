import { useContext } from "react"
import { AnimationContext } from "./config"

export const useAnimation = () => {
  const {animate} = useContext(AnimationContext)
  return {animate}
}