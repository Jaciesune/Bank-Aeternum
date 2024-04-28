import { getCurrentUser } from "@/lib/session"
import { LoanForm } from "@/components/forms/loans/loan-form"

export default async function Page() {
  const user = await getCurrentUser()

  return (
    <div>
      <h1 className="my-4 text-4xl font-semibold">Kredyt</h1>
      <LoanForm/>
    </div>
  )
}
