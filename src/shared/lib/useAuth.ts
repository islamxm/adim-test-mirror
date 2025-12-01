import { useSession } from "next-auth/react"

export const useAuth = () => {
  const {status} = useSession()
  return status === 'authenticated' ? true : false;
}