import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import VerifyEmailForm from "@/components/forms/verify-email-form"

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weryfikacja</CardTitle>
        <CardDescription>
          Jeszcze jeden krok aby Twoje konto zostało aktywowane.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <VerifyEmailForm />
      </CardFooter>
    </Card>
  )
}
