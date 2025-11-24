import { AuthPage as AuthPageCompoent } from "@/pages/authPage"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const session = await getServerSession()

  if(session) {
    redirect('/home')
  }

  return <AuthPageCompoent/>
}