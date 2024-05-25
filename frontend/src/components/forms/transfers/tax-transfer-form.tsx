"use client"

import * as yup from "yup"
import SubmitButton from "@/components/shared/submit-button"
import useDataFetching from "@/hooks/useDataFetching"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Account } from "@/types"

import fetchClient from "@/lib/fetch-client"
import { cn, formatBankAccountNumber } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { AccountsSelect } from "@/components/fields/accounts-select"

import { symbols, taxOffices } from "./data"
import { toast } from "sonner"

type FormValues = {
  form_symbol: string
  tax_office_account_number: string
  pesel: string
  from_account: string
  amount: number
  date: string
  name: "tax"
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  form_symbol: yup.string().required("To pole jest wymagane."),
  tax_office_account_number: yup.string().required("To pole jest wymagane."),
  pesel: yup
    .string()
    .matches(/^\d{11}$/, "Niepoprawny numer PESEL.")
    .required("To pole jest wymagane."),
  from_account: yup.string().required("To pole jest wymagane."),
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
    .oneOf(["tax"] as const),
})

export function TaxTransferForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      form_symbol: "",
      tax_office_account_number: "",
      pesel: "",
      from_account: "",
      amount: 0,
      name: "tax",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
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
          name: "tax",
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
          {/* Form Symbol*/}
          <FormField
            control={form.control}
            name="form_symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol formularza</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Nie wybrano" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {symbols.map((symbol) => (
                      <SelectItem key={symbol.symbol} value={symbol.symbol}>
                        {symbol.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {
                    symbols.find((symbol) => symbol.symbol === field.value)
                      ?.form_title
                  }
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Tax Office Account Number */}
          <FormField
            control={form.control}
            name="tax_office_account_number"
            render={({ field }) => {
              const taxOffice = taxOffices.find(
                (office) => office.bank_account_number === field.value
              )

              return (
                <FormItem>
                  <FormLabel>Konto urzędu skarbowego</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Nie wybrano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {taxOffices.map((office) => (
                        <SelectGroup
                          key={office.office_name}
                          title={office.office_name}
                        >
                          <SelectItem value={office.bank_account_number}>
                            <div className="flex items-center space-x-2">
                              <span>{office.office_name}</span>
                              <span className="capitalize text-muted-foreground">
                                {office.street} {office.number},{" "}
                                {office.province}
                              </span>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {taxOffice && (
                      <Badge variant="outline">
                        <span className="ml-1">
                          {formatBankAccountNumber(
                            taxOffice.bank_account_number
                          )}
                        </span>
                      </Badge>
                    )}
                  </FormDescription>
                </FormItem>
              )
            }}
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
                  <FormMessage />
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
        </CardContent>

        {/* Submit button */}
        <CardFooter>
          <SubmitButton form={form} />
        </CardFooter>
      </form>
    </Form>
  )
}
