"use client"

import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
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

type TypeOfTransfer = "standard" | "express"

type FormValues = {
  from_account: string
  receiver_name: string
  receiver_account_number: string
  title: string
  amount: string
  date: string
  type_of_transfer: TypeOfTransfer
}

export function DomesticTransferForm() {
  const form = useForm<FormValues>()

  async function onSubmit({
    from_account,
    receiver_name,
    receiver_account_number,
    title,
    amount,
    date,
    type_of_transfer,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/forgot-password",
        body: JSON.stringify({
          from_account,
          receiver_name,
          receiver_account_number,
          title,
          amount,
          date,
          type_of_transfer,
        }),
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

      throw new Error("An error has occurred during the request")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8d">
        <CardContent>
          {/* From account */}
          <FormField
            control={form.control}
            name="from_account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Z konta</FormLabel>
                <FormControl>
                  <Input placeholder="Numer twojego konta" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Receiver name */}
          <FormField
            control={form.control}
            name="receiver_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Odbiorca</FormLabel>
                <FormControl>
                  <Input placeholder="Nazwa odbiorcy" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Receiver account number */}
          <FormField
            control={form.control}
            name="receiver_account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number konta odbiorcy</FormLabel>
                <FormControl>
                  <Input placeholder="0000 0000 ..." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tytuł</FormLabel>
                <FormControl>
                  <Input placeholder="Przelew środków" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kwota</FormLabel>
                <FormControl>
                  <Input placeholder="0.0 zł" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data przelewu</FormLabel>
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
                      mode="single"
                      // selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type of transfer */}
          <FormField
            control={form.control}
            name="type_of_transfer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ przelewu</FormLabel>
                <FormControl>
                  <Input placeholder="Typ przelewu" {...field} />
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
            Wykonaj
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}