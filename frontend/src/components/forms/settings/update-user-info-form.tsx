"use client"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { error } from "console"
import { Loader2 } from "lucide-react"
import type { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"
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

interface UpdateUserFormProps {
  user?: User
}

type FormValues = {
  first_name: string
  last_name: string
  email: string
  pesel: string
  phone: string
  street: string
  city: string
  postal_code: string
  country: string
  house_number: string
  apartment_number?: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  first_name: yup.string().required("Imię jest wymagane"),
  last_name: yup.string().required("Nazwisko jest wymagane"),
  email: yup
    .string()
    .email("Niepoprawny adres email")
    .required("Email jest wymagany")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Niepoprawny adres email"
    ),
  pesel: yup
    .string()
    .required("Pesel jest wymagany")
    .matches(/^[0-9]{11}$/, "Pesel musi składać się z 11 cyfr"),
  phone: yup
    .string()
    .required("Telefon jest wymagany")
    .matches(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Telefon musi składać się z 9 cyfr"
    ), // https://regex101.com/r/DsaRfI/1
  street: yup
    .string()
    .required("Ulica jest wymagana")
    .matches(/^[a-zA-Z0-9\s]*$/, "Ulica nie może zawierać znaków specjalnych"),
  city: yup
    .string()
    .required("Miasto jest wymagane")
    .matches(/^[a-zA-Z\s]*$/, "Miasto nie może zawierać cyfr"),
  postal_code: yup
    .string()
    .required("Kod pocztowy jest wymagany")
    .matches(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie XX-XXX"),
  country: yup
    .string()
    .required("Kraj jest wymagany")
    .matches(/^[a-zA-Z\s]*$/, "Kraj nie może zawierać cyfr"),
  house_number: yup
    .string()
    .required("Numer domu jest wymagany")
    .matches(/^[0-9]*$/, "Numer domu musi być liczbą"),
  apartment_number: yup.string(),
})

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const router = useRouter()
  const { update } = useSession()

  const form = useForm<FormValues>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      pesel: user?.pesel,
      phone: user?.phone,
      street: user?.address.street,
      city: user?.address.city,
      postal_code: user?.address.postal_code,
      country: user?.address.country,
      house_number: user?.address.house_number,
      apartment_number: user?.address.apartment_number || "",
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit({
    first_name,
    last_name,
    email,
    pesel,
    phone,
    street,
    city,
    postal_code,
    country,
    house_number,
    apartment_number,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          pesel,
          phone,
          street,
          city,
          postal_code,
          country,
          house_number,
          apartment_number,
        }),
      })

      if (!response.ok) {
        throw response
      }

      const user = await response.json()
      await update(user)
      toast.success("Dane użytkownika zostały zaktualizowane")

      router.refresh()
    } catch (error) {
      toast.error("Wystąpił błąd podczas aktualizacji danych użytkownika")
      if (error instanceof Response) {
        const response = await error.json()

        if (!response.errors) {
          throw error
        }
      }

      throw new Error("An error has occurred during update user request")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input placeholder="Jan" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input placeholder="Kowalski" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pesel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesel</FormLabel>
                <FormControl>
                  <Input placeholder="12345678901" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kraj</FormLabel>
                <FormControl>
                  <Input placeholder="Polska" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miasto</FormLabel>
                <FormControl>
                  <Input placeholder="Miasto" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulica</FormLabel>
                <FormControl>
                  <Input placeholder="Ulica" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid w-full grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="house_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer domu</FormLabel>
                <FormControl>
                  <Input placeholder="00" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apartment_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer mieszkania</FormLabel>
                <FormControl>
                  <Input placeholder="00" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kod pocztowy</FormLabel>
                <FormControl>
                  <Input placeholder="00-000" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={
            form.formState.isSubmitting ||
            !form.formState.isDirty ||
            !form.formState.isValid
          }
          className="mt-4"
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}

          {form.formState.isSubmitting ? "Aktualizuję dane" : "Aktualizuj dane"}
        </Button>
      </form>
    </Form>
  )
}
