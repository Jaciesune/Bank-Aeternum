"use client"

import { FilePlus2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type FormValues = {
  amount: number
  duration: number
  installment_type: string
  down_payment: number
}

type ChartData = {
  month: number
  amount: number
}

type DataTable = {
  label: string
  value: string
}

const INTEREST_RATE = 9.9
const APR = 12.28

export default function Page() {
  const [goal, setGoal] = useState(350)
  const [data, setData] = useState<ChartData[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [dataTable, setDataTable] = useState<DataTable[]>([
    { label: "Twoja rata miesięczna", value: "636 zł" },
    { label: "RRSO", value: `${APR}%` },
    { label: "Oprocentowanie", value: `${INTEREST_RATE}%` },
    { label: "Ubezpieczenie kredytu", value: "1 188 zł" },
  ])

  const form = useForm<FormValues>({
    defaultValues: {
      amount: 30000,
      duration: 12,
      installment_type: "Raty równe",
      down_payment: 0,
    },
  })

  // Ensure that down payment is not higher than half of the loan amount
  useEffect(() => {
    const currentAmount = form.getValues("amount")
    const currentDownPayment = form.getValues("down_payment")
    if (currentDownPayment > currentAmount / 2) {
      form.setValue("down_payment", currentAmount / 2)
    }
  }, [form.getValues("amount")])

  // Calculate monthly rate and total cost
  useEffect(() => {
    const { amount, duration, installment_type, down_payment } =
      form.getValues()
    const loanAmount: number = amount - down_payment
    const monthlyRate = calculateMonthlyRate(
      loanAmount,
      duration,
      installment_type
    )
    const totalCost = calculateTotalCost(loanAmount, duration, installment_type)

    setData(generateChartData(loanAmount, duration))
    setTotalCost(totalCost)
    setDataTable([
      { label: "Twoja rata miesięczna", value: `${monthlyRate} zł` },
      { label: "RRSO", value: `${APR}%` },
      { label: "Oprocentowanie", value: `${INTEREST_RATE}%` },
      { label: "Ubezpieczenie kredytu", value: "1 188 zł" },
    ])
  }, [
    form.watch("amount"),
    form.watch("duration"),
    form.watch("installment_type"),
    form.watch("down_payment"),
  ])

  function calculateMonthlyRate(
    amount: number,
    duration: number,
    installment_type: string
  ): string {
    const monthlyInterestRate = INTEREST_RATE / 100 / 12
    if (installment_type === "Raty równe") {
      return (
        (amount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -duration))
      ).toFixed(2)
    }
    return (amount / duration + amount * monthlyInterestRate).toFixed(2)
  }

  function calculateTotalCost(
    amount: number,
    duration: number,
    installment_type: string
  ): number {
    const monthlyRate = parseFloat(
      calculateMonthlyRate(amount, duration, installment_type)
    )
    return parseFloat((monthlyRate * duration).toFixed(2))
  }

  function generateChartData(amount: number, duration: number): ChartData[] {
    const data: ChartData[] = []
    for (let i = 1; i <= duration; i++) {
      data.push({ month: i, amount: Math.round((amount * i) / duration) })
    }
    return data
  }

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <div>
      <h1 className="my-4 text-4xl font-semibold">Kredyty</h1>

      <Form {...form}>
        <form>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <FilePlus2 className="mr-2 h-4 w-4" />
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

                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-4">
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
                </div>

                <div className="space-y-4 p-4">
                  {/* Loan Amount */}
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

                  {/* Duration */}
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
                          {field.value <= 1
                            ? "miesiąc"
                            : field.value > 1 && field.value < 5
                              ? "miesiące"
                              : "miesięcy"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Down Payment */}
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

                  {/* Loan Type */}
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
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DrawerFooter className="flex w-full flex-row justify-end gap-2">
                  <DrawerClose asChild>
                    <Button variant="outline">Anuluj</Button>
                  </DrawerClose>
                  <Button>Weź kredyt</Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </form>
      </Form>
    </div>
  )
}
