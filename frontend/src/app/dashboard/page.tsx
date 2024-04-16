import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import RegisterInfoForm from "@/components/forms/register-info-form"

export default function Page() {
  return (
    <h1>
      Dashboard
      <div className="w-full max-w-[500px] space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Uzupełnij dane adresowe</CardTitle>
            <CardDescription>
              Ostatni krok do rozpoczęcia korzystania z konta bankowego.
            </CardDescription>
          </CardHeader>

          <RegisterInfoForm />
        </Card>
      </div>
    </h1>
  )
}
