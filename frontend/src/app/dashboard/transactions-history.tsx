import Status from "@/components/shared/status"
import useDataFetching from "@/hooks/useDataFetching"
import { format } from "date-fns"
import Link from "next/link"

import type { Account, Transaction } from "@/types"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TransactionsHistoryProps = {
  account: Account | null
}

export default function TransactionsHistory({
  account,
}: TransactionsHistoryProps) {
  const { data: transactions, loading } = useDataFetching<Transaction[]>(
    `/api/transactions/${account?.id}?limit=5`
  )

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="flex w-full items-center justify-between gap-2">
          <CardTitle>Historia Transakcji</CardTitle>

          {account && (
            <Button asChild size="sm" variant="outline">
              <Link href={`/dashboard/transactions/${account.id}`}>
                Pokaż wszystkie
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>

      {loading ? (
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
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
                      <Skeleton className="my-0.5 mt-1 h-4 w-8" />
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
      ) : (
        <CardContent>
          {transactions && transactions.length > 0 ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Kwota</TableHead>
                  <TableHead className="text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  const incoming =
                    transaction.to_account == account?.account_number || null

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Status status={transaction.status} />
                      </TableCell>
                      <TableCell
                        className={cn(
                          "uppercase",
                          incoming
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500"
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
            <div className="text-xs text-muted-foreground">Brak transakcji</div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
