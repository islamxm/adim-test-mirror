import { getAuthOptions } from "@/entities/user"
import { AuthPage as AuthPageCompoent } from "@/_pages/authPage"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export default async function AuthPage() {
  const session = await getServerSession(getAuthOptions(cookies))  
  
  if(session?.accessToken) {
    redirect('/home')
  }

  return <AuthPageCompoent/>
}