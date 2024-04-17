"use client"

import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import fetchClient from "@/lib/fetch-client"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

type FormValues = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  street: string
  house_number: number
  postal_code: string
  city: string
  country: string
  phone: number
  birth_date: Date
  pesel: number
  gender: string
}

export default function RegisterForm() {
  const form = useForm<FormValues>()
  async function onSubmit({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    street,
    house_number,
    postal_code,
    city,
    country,
    phone,
    birth_date,
    pesel,
    gender,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/register",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          password_confirmation,
          street,
          house_number,
          postal_code,
          city,
          country,
          phone,
          birth_date,
          pesel,
          gender,
        }),
      })

      if (!response.ok) {
        throw response
      }

      const credentials = {
        email,
        password,
      }

      signIn("credentials", credentials)
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json()

        if (!response.errors) {
          throw error
        }

        console.log(response.errors)
        // return Object.keys(response.errors).map((errorKey) => {
        //   const input = document.querySelector(
        //     `[name="${errorKey}"]`
        //   ) as HTMLInputElement
        //   input.setCustomValidity(response.errors[errorKey])
        //   input.reportValidity()
        // })
      }

      throw new Error("An error has occurred during registration request")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8d">
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* First name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imie</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name */}
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

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Podaj swój email" {...field} />
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

          {/* Password confirmation */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potwierdź hasło</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Potwierdź hasło"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Country */}
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

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miasto</FormLabel>
                  <FormControl>
                    <Input placeholder="Limanowa" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Street */}
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulica</FormLabel>
                <FormControl>
                  <Input placeholder="Lenina 14" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal code */}
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kod pocztowy</FormLabel>
                <FormControl>
                  <Input placeholder="34-600" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* House number */}
          <FormField
            control={form.control}
            name="house_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer domu</FormLabel>
                <FormControl>
                  <Input placeholder="420" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer telefonu</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-4" />

          {/* Birth date */}
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data urodzenia</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Wybierz datę</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={pl}
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={new Date().getFullYear() - 18}
                      mode="single"
                      // selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pesel */}
          <FormField
            control={form.control}
            name="pesel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesel</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="12345678901" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Płeć</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz płeć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="woman">Kobieta</SelectItem>
                    <SelectItem value="man">Mężczyzna</SelectItem>
                    <SelectItem value="other">Inna</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        {/* Submit button */}
        <CardFooter>
          <Button className="w-full" type="submit">
            Zarejestruj się
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
