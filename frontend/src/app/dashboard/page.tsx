"use client"

import { time } from "console"
import { format } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"
import { DollarSign } from "react-feather"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Transaction = {
  id: number
  amount: number
  currency?: string
  created_at: string
  account_id: number
  type: string
  status: string
  title: string
  reference?: string
  user: string
  account: string
}

const Page = () => {
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/account`,
        })
        const data = await response.json()
        setBalance(data.balance)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    const fetchTransactions = async (limit: number = 6) => {
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/account/1/transactions?limit=${limit}`, // TODO: remove hardcoded account id
        })
        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
    fetchTransactions(5)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Balance */}
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saldo Konta</CardTitle>
              <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance}</div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="col-span-1 grow">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Powiadomienia</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1"></Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

          {/* History */}
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="flex w-full items-center justify-between gap-2">
                <CardTitle>Historia Transakcji</CardTitle>

                <Button asChild size="sm" variant="outline">
                  <Link href="/dashboard/transactions">Pokaż wszystkie</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {transactions.length > 0 ? (
                <Table className="w-full">
                  <TableCaption>Ostatnie transakcje</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Kwota</TableHead>
                      <TableHead className="text-right">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell className="text-right">
                          {format(transaction.created_at, "dd.MM.yyyy HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Brak transakcji
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Page
