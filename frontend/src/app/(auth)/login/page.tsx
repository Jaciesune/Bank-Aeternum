import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import LoginForm from "@/components/forms/login-form"

export default function Page() {
  return (
    <div className="w-full max-w-[400px] space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Logowanie</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <LoginForm />
      </Card>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/register">Rejestracja</Link>
        </Button>

        <Button asChild variant="link">
          <Link href="/forgot-password">Zapomniałeś hasła?</Link>
        </Button>
      </div>
    </div>
  )
}
