import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import fetchServer from "@/lib/fetch-server"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session?.user?.email_verified_at) {
    redirect("/dashboard")
  }

  async function sendVerificationLink() {
    "use server"

    try {
      const response = await fetchServer({
        method: "POST",
        url:
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/api/email/verification-notification",
      })

      if (!response.ok) {
        throw response
      }
    } catch (error) {
      throw new Error("Could not send email verification request", {
        cause: error,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zweryfikuj email</CardTitle>
        <CardDescription>
          Na swoją pocztę otrzymasz link weryfikacyjny.
        </CardDescription>
      </CardHeader>

      {/* TODO Add loading state - 1min */}
      <CardFooter>
        <form action={sendVerificationLink} className="w-full">
          <Button className="w-full" type="submit">
            Wyślij link aktywacyjny
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
