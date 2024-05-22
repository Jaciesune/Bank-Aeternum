"use client"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

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

import SubmitButton from "../shared/submit-button"

type FormValues = {
  email: string
  password: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  email: yup.string().email().required("Email jest wymagany"),
  password: yup
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .required("Hasło jest wymagane"),
})

export default function LoginForm() {
  const searchParams = useSearchParams()
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  })

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

        <CardFooter>
          <SubmitButton
            form={form}
            className="w-full"
            loadingText="Logowanie"
            buttonText="Zaloguj się"
          />
        </CardFooter>
      </form>
    </Form>
  )
}
