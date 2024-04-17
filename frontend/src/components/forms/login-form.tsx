"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FormValues = {
  email: string
  password: string
}

export default function LoginForm() {
  const searchParams = useSearchParams()
  const form = useForm<FormValues>()

  async function onSubmit({ email, password }: FormValues) {
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    signIn("credentials", { email, password, callbackUrl })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8d">
        <CardContent>
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Twój email" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Twoje hasło" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        {/* Submit button */}
        <CardFooter>
          <Button className="w-full" type="submit">
            Zaloguj się
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
