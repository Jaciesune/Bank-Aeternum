"use client"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
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
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { AccountsSelect } from "@/components/fields/accounts-select"

import SubmitButton from "./submit-button"

type TypeOfTransfer = "standard" | "express"

type FormValues = {
  to_account: string
  from_account: string
  receiver_name: string
  title: string
  amount: number
  date: string
  type_of_transfer: TypeOfTransfer
  country: string
  name: "foreign"
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  to_account: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(/^\d{20}$/, "Numer konta musi składać się z 20 cyfr."),
  from_account: yup.string().required("To pole jest wymagane."),
  receiver_name: yup.string().required("To pole jest wymagane."),
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
  type_of_transfer: yup.string().oneOf(["standard", "express"]).required(),
  country: yup.string().required("To pole jest wymagane."),
  name: yup
    .string()
    .required()
    .oneOf(["foreign"] as const),
})

export function ForeignTransferForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      to_account: "",
      from_account: "",
      receiver_name: "",
      title: "",
      amount: 0,
      date: "",
      type_of_transfer: "standard",
      country: "",
      name: "foreign",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  })
  const [accounts, setAccounts] = useState<Account[]>([])

  async function onSubmit({
    to_account,
    from_account,
    receiver_name,
    title,
    amount,
    date,
    type_of_transfer,
    country,
    name,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/transfer",
        body: JSON.stringify({
          from_account,
          to_account,
          title,
          amount,
          country,
          name: "foreign",
        }),
      })

      if (!response.ok) {
        throw response
      }
      toast.success("Przelew został wykonany pomyślnie.")
      form.reset()
    } catch (error) {
      toast.error("Wystąpił błąd podczas wykonywania transferu.")
      throw new Error("An error has occurred during the request")
    }
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/account`,
        })
        const data = await response.json()
        setAccounts(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchAccounts()
  }, [])

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
                    accounts={accounts}
                    onChangeValue={field.onChange}
                    selectedValue={field.value}
                  />
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
            name="to_account"
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

          {/* Receiver country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kraj Odbiorcy</FormLabel>
                <FormControl>
                  <Input placeholder="Polska" {...field} />
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

          {/* Type of transfer */}
          <FormField
            control={form.control}
            name="type_of_transfer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ przelewu</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Standardowy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" />
                      <Label htmlFor="option-two">Natychmiastowy</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <CardFooter>
          <SubmitButton form={form} />
        </CardFooter>
      </form>
    </Form>
  )
}
