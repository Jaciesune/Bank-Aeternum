import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import RegisterForm from "@/components/forms/register-form"

export default function Page() {
  return (
    <div className="w-full max-w-[400px] space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Rejestracja</CardTitle>
          <CardDescription>Zarejestruj nowe konto w banku.</CardDescription>
        </CardHeader>

        <RegisterForm />
      </Card>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/login">Zaloguj się</Link>
        </Button>
      </div>
    </div>
  )
}
