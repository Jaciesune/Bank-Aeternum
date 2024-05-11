"use client"

import { time } from "console"
import { format } from "date-fns"
import { EmblaCarouselType } from "embla-carousel"
import { EllipsisVertical, Plus } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { DollarSign } from "react-feather"

import fetchClient from "@/lib/fetch-client"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
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

import { DotButton, useDotButton } from "./dots"

type Account = {
  id: number
  name: string
  account_number: string
  balance: number
  currency: string
}

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
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

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

  useEffect(() => {
    const fetchTransactions = async (account_id: number, limit: number) => {
      setTransactionsLoading(true)
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/account/${account_id}/transactions?limit=${limit}`,
        })
        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      setTransactionsLoading(false)
    }

    if (accounts) {
      fetchTransactions(accounts[selectedIndex]?.id || 1, 5)
    }
  }, [selectedIndex])

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Accounts */}
      <Card className="col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Twoje Konta</CardTitle>
          <Button variant="outline" size="icon" title="Dodaj nowe konto">
            <Plus />
          </Button>
        </CardHeader>
        <CardContent>
          <Carousel setApi={setApi}>
            <CarouselPrevious />

            <CarouselContent>
              {accounts.map((account) => (
                <CarouselItem key={account.id}>
                  <Card className="m-px flex flex-col gap-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>{account.name}</CardTitle>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edytuj nazwę</DropdownMenuItem>
                          <DropdownMenuItem>Usuń konto</DropdownMenuItem>
                          <DropdownMenuItem>Zablokuj konto</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {account.balance} {account.currency}
                      </div>
                      <Badge variant="outline">
                        {account.account_number.replace(/(\d{4})/g, "$1 ")}
                      </Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext />
          </Carousel>
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Konto {selectedIndex + 1} z {accounts.length}
          </span>

          <div className="flex flex-row gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn("size-4 rounded-full", {
                  "bg-primary": index === selectedIndex,
                  "border-2 border-border": index !== selectedIndex,
                })}
              />
            ))}
          </div>
        </CardFooter>
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

        {!transactionsLoading ? (
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
        ) : (
          <CardContent>
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
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default Page
