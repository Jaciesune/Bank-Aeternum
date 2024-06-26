"use client"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ChangePasswordForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetchClient({
        method: "PATCH",
        url:
          process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/change-password",
        body: JSON.stringify(Object.fromEntries(formData)),
      })

      if (!response.ok) {
        throw response
      }
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json()

        if (!response.errors) {
          throw error
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(
            `[name="${errorKey}"]`
          ) as HTMLInputElement
          input.setCustomValidity(response.errors[errorKey])
          input.reportValidity()
        })
      }

      throw new Error("An error has occurred during forgot password request")
    }
  }

  function clearValidity(e: any) {
    const target = e.currentTarget
    target.setCustomValidity("")
    target.reportValidity()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="password">Hasło</label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Hasło"
        onChange={clearValidity}
      />

      <label htmlFor="password_confirmation">Powtórz hasło</label>
      <Input
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        placeholder="Powtórz hasło"
        onChange={clearValidity}
      />

      <Button className="w:5" type="submit">
        Zmień hasło
      </Button>
    </form>
  )
}
