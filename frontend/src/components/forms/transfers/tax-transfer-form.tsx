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
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FormValues = {
  form_symbol: string
  tax_office_account_number: string
  identyficator_type: string
  identyficator_number: string
  from_account: string
  amount: string
  date: Date
  type_of_transfer: string
}

export function TaxTransferForm() {
  const form = useForm<FormValues>()

  async function onSubmit({}: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/forgot-password",
        body: JSON.stringify({}),
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
          {/* Form Symbol*/}
          <FormField
            control={form.control}
            name="form_symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol Formularza</FormLabel>
                <FormControl>
                  <Input placeholder="PIT" {...field} />
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
                  <Input placeholder="Wpisz numer konta" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Identyficator Type*/}
          <FormField
            control={form.control}
            name="identyficator_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ Identyfikatora</FormLabel>
                <FormControl>
                  <Input placeholder="PESEL" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Identyficator Number */}
          <FormField
            control={form.control}
            name="identyficator_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer Identyfikatora</FormLabel>
                <FormControl>
                  <Input placeholder="034******21" {...field} />
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
                <FormLabel>Wybierz</FormLabel>
                <FormControl>
                  <Input placeholder="034******21" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                    <Input placeholder="0.0 zł" {...field} />
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
          <Button className="w-full" type="submit">
            Wykonaj
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
