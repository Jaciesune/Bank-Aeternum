import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"

export default function Page() {
  return (
    <div className="w-full max-w-[400px] space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Odzyskaj hasło</CardTitle>
          <CardDescription>
            Wprowadź swój adres email, aby otrzymać link do resetowania hasła.
          </CardDescription>
        </CardHeader>

        <ForgotPasswordForm />
      </Card>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/login">Zaloguj się</Link>
        </Button>
      </div>
    </div>
  )
}
