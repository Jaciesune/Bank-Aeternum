"use client"

import useDataFetching from "@/hooks/useDataFetching"
import { EllipsisVertical, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import { Loan } from "@/types"

import { DotButton, useDotButton } from "@/app/dashboard/dots"

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { NewLoanModal } from "./new-loan-modal"

export default function Page() {
  const [api, setApi] = useState<CarouselApi>()

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

  const { data: loans } = useDataFetching<Loan[]>("/api/loan")

  const paidLoans = loans?.filter((loan) => loan.status === "paid") || []
  const unpaidLoans = loans?.filter((loan) => loan.status === "unpaid") || []

  return (
    <div>
      <h1 className="my-6 text-4xl font-semibold">Kredyty</h1>

      <div className="my-4 space-y-4">
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Trwające</CardTitle>
            <NewLoanModal />
          </CardHeader>
          <CardContent>
            <Carousel setApi={setApi}>
              <CarouselPrevious />

              <CarouselContent>
                {unpaidLoans.map((loan) => (
                  <CarouselItem key={loan.id}>
                    <Card className="m-px flex flex-col gap-2">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{loan.amount} PLN</CardTitle>

                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <EllipsisVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edytuj nazwę</DropdownMenuItem>
                            <DropdownMenuItem>Zgłoś zmianę</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2 text-xl font-bold">
                          Miesięcy do spłaty: {loan.duration}
                        </div>
                        <Badge variant="outline">
                          Oprocentowanie {loan.interest_rate}%
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
              {unpaidLoans.length} kredytów
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

        <Card>
          <CardHeader>
            <CardTitle>Spłacone</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Kwota</TableCell>
                  <TableCell>Oprocentowanie</TableCell>
                  <TableCell>Czas trwania</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Data utworzenia</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.amount} zł</TableCell>
                    <TableCell>{loan.interest_rate}%</TableCell>
                    <TableCell>{loan.duration} miesięcy</TableCell>
                    <TableCell>{loan.status}</TableCell>
                    <TableCell>
                      {new Date(loan.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button disabled>Pokaż więcej</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
