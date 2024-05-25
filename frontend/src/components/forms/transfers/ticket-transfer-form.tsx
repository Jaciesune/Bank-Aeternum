"use client"

import SubmitButton from "@/components/shared/submit-button"
import useDataFetching from "@/hooks/useDataFetching"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import type { Account } from "@/types"

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
import { toast } from "sonner"

type FormValues = {
  form_symbol: string
  tax_office_account_number: string
  pesel: string
  from_account: string
  amount: string
  date: Date
  type_of_transfer: string
  name: "ticket"
}

export function TicketTransferForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      form_symbol: "Mandaty",
      tax_office_account_number: "47 1010 0055 0201 6090 0999 0000",
      pesel: "",
      from_account: "",
      amount: "",
      date: new Date(),
      type_of_transfer: "standard",
      name: "ticket",
    },
  })

  const { data: accounts } = useDataFetching<Account[]>("/api/account")

  async function onSubmit({
    form_symbol,
    tax_office_account_number,
    pesel,
    from_account,
    amount,
    date,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/transfer",
        body: JSON.stringify({
          form_symbol,
          to_account: tax_office_account_number,
          pesel,
          from_account,
          amount,
          date,
          name: "ticket",
        }),
      })

      if (!response.ok) {
        throw response
      }
      toast.success("Przelew został wykonany pomyślnie.")
      form.reset()
    } catch (error) {
      throw new Error("An error has occurred during the request")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent>
          {/* Form Symbol */}
          <FormField
            control={form.control}
            name="form_symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol Formularza</FormLabel>
                <FormControl>
                  <Input placeholder="Mandaty" {...field} disabled />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tax Office Account Number */}
          <FormField
            control={form.control}
            name="tax_office_account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konto urzędu skarbowego</FormLabel>
                <FormControl>
                  <Input placeholder="Wpisz numer konta" {...field} disabled />
                </FormControl>
                <FormDescription>
                  Urząd skarbowy w Opolu. Wszystkie mandaty są opłacane na to
                  konto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PESEL */}
          <FormField
            control={form.control}
            name="pesel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PESEL</FormLabel>
                <FormControl>
                  <Input placeholder="00000000000" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* From Account */}
          <FormField
            control={form.control}
            name="from_account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Z konta</FormLabel>
                <FormControl>
                  <AccountsSelect
                    placeholder="Nie wybrano konta."
                    accounts={accounts || []}
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

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kwota</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0 PLN" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2.5">
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
                            format(field.value, "PPP", { locale: pl })
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
                        onSelect={field.onChange}
                        disabled={(date: Date) => date <= new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          {/* Type of transfer */}
          <FormField
            control={form.control}
            name="type_of_transfer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ przelewu</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standardowy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="immediate" />
                      <Label htmlFor="immediate">Natychmiastowy</Label>
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
          <SubmitButton form={form} />
        </CardFooter>
      </form>
    </Form>
  )
}
