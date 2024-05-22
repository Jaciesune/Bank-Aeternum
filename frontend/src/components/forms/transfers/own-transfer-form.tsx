"use client"

import * as yup from "yup"
import SubmitButton from "@/components/shared/submit-button"
import useDataFetching from "@/hooks/useDataFetching"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Account } from "@/types"

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

import { AccountsSelect } from "@/components/fields/accounts-select"

type FormValues = {
  to_account: string
  from_account: string
  title: string
  amount: number
  date: string
  name: "own"
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  to_account: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(/^\d{20}$/, "Numer konta musi składać się z 20 cyfr."),
  from_account: yup.string().required("To pole jest wymagane."),
  title: yup.string().required("To pole jest wymagane."),
  amount: yup
    .number()
    .positive("Kwota musi być większa od 0.")
    .min(0.01, "Kwota musi być większa od 0.")
    .typeError("To pole musi być liczbą.")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("To pole jest wymagane."),
  date: yup.string().required("To pole jest wymagane."),
  name: yup
    .string()
    .required()
    .oneOf(["own"] as const),
})

export function OwnTransferForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      to_account: "",
      from_account: "",
      title: "",
      amount: 0,
      date: "",
      name: "own",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  })

  async function onSubmit({
    to_account,
    from_account,
    title,
    amount,
    date,
    name,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/transfer",
        body: JSON.stringify({
          to_account,
          from_account,
          title,
          amount,
          date: format(date, "yyyy-MM-dd"),
          name,
        }),
      })

      if (!response.ok) {
        throw response
      }
      toast.success("Przelew został wykonany pomyślnie.")
      form.reset()
    } catch (error) {
      toast.error("Wystąpił błąd podczas wykonywania przelewu.")
      throw new Error("An error has occurred during the request")
    }
  }

  const { data: accounts } = useDataFetching<Account[]>("/api/account")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent>
          {/* From account */}
          <FormField
            control={form.control}
            name="from_account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Z konta</FormLabel>
                <FormControl>
                  <AccountsSelect
                    placeholder="Nie wybrano konta."
                    accounts={
                      accounts?.filter(
                        (account) =>
                          account.account_number !==
                          form.getValues("to_account")
                      ) || []
                    }
                    onChangeValue={field.onChange}
                    selectedValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Konto z którego chcesz wykonać przelew.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Receiver name */}
          <FormField
            control={form.control}
            name="to_account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Na Konto</FormLabel>
                <FormControl>
                  <AccountsSelect
                    placeholder="Nie wybrano konta."
                    accounts={
                      accounts?.filter(
                        (account) =>
                          account.account_number !==
                          form.getValues("from_account")
                      ) || []
                    }
                    onChangeValue={field.onChange}
                    selectedValue={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Numer konta odbiorcy przelewu.
                </FormDescription>
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
                  <Input type="number" {...field} />
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
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
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
        </CardContent>

        {/* Submit button */}
        <CardFooter>
          <SubmitButton form={form} />
        </CardFooter>
      </form>
    </Form>
  )
}
