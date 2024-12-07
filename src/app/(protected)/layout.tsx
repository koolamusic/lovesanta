import { redirect } from "next/navigation"
import { auth } from "~/server/auth"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  console.log({ session, from: '[protected layout]' })

  if (!session) {
    redirect('/')
  }

  return <>{children}</>
}