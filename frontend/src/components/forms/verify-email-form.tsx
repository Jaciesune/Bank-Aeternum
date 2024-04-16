"use client"

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"

export default function VerifyEmailForm() {
  const router = useRouter()
  const { update } = useSession()
  const searchParams = useSearchParams()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const url = searchParams.get("url")
      const signature = searchParams.get("signature")
      const response = await fetchClient({ url: url + `&signature=${signature}` }) // "?" danger

      if (!response.ok) {
        throw response
      }

      await update({ type: "MANUAL" })

      router.push("/dashboard")
    } catch (error) {
      throw new Error("Could not verify email", { cause: error })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button type="submit" className="w-full">
        Zweryfikuj email
      </Button>
    </form>
  )
}
