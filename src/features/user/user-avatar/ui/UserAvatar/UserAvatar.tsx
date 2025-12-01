import { Avatar, User } from "@/entities/user";
import { useSession } from "next-auth/react";

export const UserAvatar = () => {
  const {status, data} = useSession()
  const isAuth = status === 'authenticated';
  // в будущем для получения данных надо сделать отдельный запрос или получить из редакс кэша

  if(!isAuth) {
    return null
  }

  return (
    <Avatar
      size="4.8rem"
      avatarUrl={data.user?.image as User['avatarUrl']}
      />
  )

}