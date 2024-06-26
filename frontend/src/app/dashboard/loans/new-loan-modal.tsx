import SubmitButton from "@/components/shared/submit-button"
import axios from "axios"
import { stat } from "fs"
import { FilePlus2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table"

type FormValues = {
  amount: number
  duration: number
  installment_type: string
  down_payment: number
}

type DataTable = {
  label: string
  value: string
}

const INTEREST_RATE = 9.9
const APR = 12.28

const calculateMonthlyRate = (
  amount: number,
  duration: number,
  installment_type: string
): string => {
  const monthlyInterestRate = INTEREST_RATE / 100 / 12
  if (installment_type === "Raty równe") {
    return (
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -duration))
    ).toFixed(2)
  }
  return (amount / duration + amount * monthlyInterestRate).toFixed(2)
}

const calculateTotalCost = (
  amount: number,
  duration: number,
  installment_type: string
): number => {
  const monthlyRate = parseFloat(
    calculateMonthlyRate(amount, duration, installment_type)
  )
  return parseFloat((monthlyRate * duration).toFixed(2))
}

const NewLoanModal: React.FC = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      amount: 0,
      duration: 1,
      installment_type: "Raty równe",
      down_payment: 0,
    },
  })

  const [dataTable, setDataTable] = useState<DataTable[]>([
    { label: "Twoja rata miesięczna", value: "636 zł" },
    { label: "RRSO", value: `${APR}%` },
    { label: "Oprocentowanie", value: `${INTEREST_RATE}%` },
    { label: "Ubezpieczenie kredytu", value: "1 188 zł" },
  ])

  const [totalCost, setTotalCost] = useState(0)

  const { watch, getValues, setValue } = form
  const amount = watch("amount")
  const downPayment = watch("down_payment")

  useEffect(() => {
    const currentAmount = getValues("amount")
    const currentDownPayment = getValues("down_payment")
    if (currentDownPayment > currentAmount / 2) {
      setValue("down_payment", currentAmount / 2)
    }
  }, [getValues, setValue])

  useEffect(() => {
    const loanAmount = amount - downPayment
    const monthlyRate = calculateMonthlyRate(
      loanAmount,
      getValues("duration"),
      getValues("installment_type")
    )
    const totalCost = calculateTotalCost(
      loanAmount,
      getValues("duration"),
      getValues("installment_type")
    )

    setTotalCost(totalCost)
    setDataTable([
      { label: "Twoja rata miesięczna", value: `${monthlyRate} zł` },
      { label: "RRSO", value: `${APR}%` },
      { label: "Oprocentowanie", value: `${INTEREST_RATE}%` },
      { label: "Ubezpieczenie kredytu", value: "1 188 zł" },
    ])
  }, [amount, downPayment, getValues])

  const onSubmit = async (values: FormValues) => {
    const loanAmount = values.amount - values.down_payment
    const monthlyRate = calculateMonthlyRate(
      loanAmount,
      values.duration,
      values.installment_type
    )

    try {
      const response = await fetchClient({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/loan`,
        body: JSON.stringify({
          amount: values.amount.toString(),
          duration: values.duration.toString(),
          installment_type: values.installment_type,
          down_payment: values.down_payment.toString(),
          interest_rate: INTEREST_RATE.toString(),
          status: "unpaid",
          installment: monthlyRate, // Przekazujemy obliczony installment tutaj
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      toast.success("Kredyt został wzięty pomyślnie.")
      form.reset()
    } catch (error) {
      toast.error("Wystąpił błąd podczas brania kredytu.")
    }
  }

  return (
    <Form {...form}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <FilePlus2 className="mr-2 size-4" />
            Nowy kredyt
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Nowy kredyt</DrawerTitle>
              <DrawerDescription>
                Wypełnij formularz, aby złożyć wniosek o kredyt.
              </DrawerDescription>
            </DrawerHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4 p-4">
                <Table>
                  <TableBody>
                    {dataTable.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.label}</TableCell>
                        <TableCell className="text-right">
                          {data.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Całkowity koszt kredytu</TableCell>
                      <TableCell className="text-right">
                        {totalCost} zł
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kwota kredytu</FormLabel>
                      <FormControl>
                        <Slider
                          min={1000}
                          max={50000}
                          step={1000}
                          value={[field.value]}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>{field.value} zł</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Czas trwania</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={60}
                          step={1}
                          value={[field.value]}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value}{" "}
                        {field.value === 1 ? "miesiąc" : "miesięcy"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="down_payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wpłata własna</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={form.getValues("amount") / 2}
                          step={500}
                          value={[field.value]}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>{field.value} zł</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typ rat</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz typ rat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Raty równe">
                                Raty równe
                              </SelectItem>
                              <SelectItem value="Raty malejące">
                                Raty malejące
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button type="submit">Złóż wniosek</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </Form>
  )
}

export default NewLoanModal
