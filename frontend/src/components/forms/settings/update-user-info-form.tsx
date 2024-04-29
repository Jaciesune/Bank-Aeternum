"use client"

import { error } from "console"
import type { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UpdateUserFormProps {
  user?: User
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const router = useRouter()
  const { update } = useSession()
  console.log(user)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetchClient({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user",
        body: JSON.stringify(Object.fromEntries(formData)),
      })

      if (!response.ok) {
        throw response
      }

      const user = await response.json()
      await update(user)

      router.refresh()
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

      throw new Error("An error has occurred during update user request")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="first_name"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Imię
          </label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            defaultValue={user?.first_name}
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="last_name"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Nazwisko
          </label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            defaultValue={user?.last_name}
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
          />
        </div>
      </div>

      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="pesel"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Pesel
          </label>
          <Input
            id="pesel"
            name="pesel"
            type="text"
            defaultValue={user?.pesel}
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Telefon
          </label>
          <Input
            id="phone"
            name="phone"
            type="text"
            defaultValue={user?.phone}
          />
        </div>
      </div>

      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            htmlFor="street"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Adres zamieszkania - Ulica
          </label>
          <Input
            id="street"
            name="street"
            type="text"
            defaultValue={user?.address.street}
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            htmlFor="city"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Adres zamieszkania - Miasto
          </label>
          <Input
            id="city"
            name="city"
            type="text"
            defaultValue={user?.address?.city}
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            htmlFor="postal_code"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Adres zamieszkania - Kod pocztowy
          </label>
          <Input
            id="postal_code"
            name="postal_code"
            type="text"
            defaultValue={user?.address.postal_code}
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            htmlFor="country"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            Adres zamieszkania - Kraj
          </label>
          <Input
            id="country"
            name="country"
            type="text"
            defaultValue={user?.address.country}
          />
        </div>
      </div>

      <Button className="w:5" type="submit">
        Aktualizuj Dane
      </Button>
    </form>
  )
}
