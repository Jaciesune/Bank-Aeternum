"use client"

import { time } from "console"
import { format } from "date-fns"
import { EmblaCarouselType } from "embla-carousel"
import { EllipsisVertical, Plus } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { DollarSign } from "react-feather"

import { Account, Transaction, Notification } from "@/types"

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
import { ScrollArea } from "@/components/ui/scroll-area"
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



const Page = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationsLoading, setNotificationsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsLoading, setTransactionsLoading] = useState(true)

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
      console.log("fetching transactions", { account_id, limit })
      setTransactionsLoading(true)
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/transactions/${account_id}?limit=${limit}`,
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
  }, [selectedIndex, accounts])

  useEffect(() => {
    const fetchNotifications = async () => {
      setNotificationsLoading(true)
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/notification`,
        })
        const data = await response.json()
        setNotifications(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      setNotificationsLoading(false)
    }

    fetchNotifications()
  }, [])

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
        <CardContent>
          <ScrollArea className="h-80">
            {!notificationsLoading ? (
              <div className="grid gap-2">
                {notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {notification.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        {notification.content}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end text-xs text-muted-foreground">
                      {format(notification.created_at, "dd.MM.yyyy HH:mm")}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-2">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-4 w-14" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Skeleton className="h-4 w-14" />
                  </CardFooter>
                </Card>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* History */}
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="flex w-full items-center justify-between gap-2">
            <CardTitle>Historia Transakcji</CardTitle>

            <Button asChild size="sm" variant="outline">
              <Link
                href={`/dashboard/transactions/${accounts[selectedIndex]?.id}`}
              >
                Pokaż wszystkie
              </Link>
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
                  {transactions.map((transaction) => {
                    const incoming =
                      transaction.to_account ==
                      accounts[selectedIndex].account_number

                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell
                          className={cn("uppercase",
                            incoming ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                          )}
                        >
                          {incoming ? "+" : "-"}
                          {transaction.amount.toFixed(2)} {transaction.currency}
                        </TableCell>
                        <TableCell className="text-right">
                          {format(transaction.created_at, "dd.MM.yyyy HH:mm")}
                        </TableCell>
                      </TableRow>
                    )
                  })}
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
