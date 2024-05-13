"use client"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Label } from "@radix-ui/react-label"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon, Loader2, RotateCcw } from "lucide-react"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { AccountsSelect } from "@/components/fields/accounts-select"

type TypeOfTransfer = "standard" | "express"

type FormValues = {
  from_account: string
  receiver_name: string
  receiver_account_number: string
  title: string
  amount: string
  date: string
  type_of_transfer: TypeOfTransfer
  name: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  from_account: yup.string().required("To pole jest wymagane."),
  receiver_name: yup.string().required("To pole jest wymagane."),
  receiver_account_number: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(/^\d{20}$/, "Numer konta musi składać się z 20 cyfr."),
  title: yup.string().required("To pole jest wymagane."),
  amount: yup
    .string()
    .required("To pole jest wymagane.")
    .matches(/^\d+(\.\d{1,2})?$/, "Niepoprawna kwota."),
  date: yup.string().required("To pole jest wymagane."),
  type_of_transfer: yup.string().oneOf(["standard", "express"]).required(),
  name: yup.string().required("To pole jest wymagane."),
})

export function DomesticTransferForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      from_account: "",
      receiver_name: "",
      receiver_account_number: "",
      title: "",
      amount: "",
      date: "",
      type_of_transfer: "standard",
      name: "domestic",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  })
  const [accounts, setAccounts] = useState<Account[]>([])

  async function onSubmit({
    from_account,
    receiver_account_number,
    title,
    amount,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/transfer",
        body: JSON.stringify({
          sender_account_id: from_account,
          receiver_account_id: receiver_account_number,
          title,
          amount,
          name: "domestic",
        }),
      })

      if (!response.ok) {
        throw response
      }
      toast.success("Przelew został wykonany pomyślnie.")
      form.reset()
    } catch (error) {
      toast.error("Wystąpił błąd podczas wykonywania transferu.")
      console.error("Error submitting form:", error)
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
            render={() => (
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

        {/* Submit button */}
        <CardFooter>
          <Button
            disabled={
              form.formState.isSubmitting ||
              !form.formState.isDirty ||
              !form.formState.isValid
            }
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}

            {form.formState.isSubmitting ? "Transakcja w toku..." : "Wykonaj"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
