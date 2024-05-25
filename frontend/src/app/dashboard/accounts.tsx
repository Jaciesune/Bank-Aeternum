import useDataFetching from "@/hooks/useDataFetching"
import { EllipsisVertical, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import type { Account } from "@/types"

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
  CarouselApi,
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
import { Skeleton } from "@/components/ui/skeleton"

import { DotButton, useDotButton } from "./dots"
import NewAccountModal from "./new-account-modal"

type AccountProps = {
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account | null>>
}


export default function Accounts({ setSelectedAccount }: AccountProps) {
  const [api, setApi] = useState<CarouselApi>()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)
  const { data: accounts, loading } = useDataFetching<Account[]>("/api/account")

  useEffect(() => {
    if (accounts) {
      setSelectedAccount(accounts[selectedIndex])
    }
  }, [accounts, selectedIndex, setSelectedAccount])


  function translateAccountType(type: string): string {
    switch (type) {
      case 'personal':
        return 'Konto osobiste'
      case 'savings':
        return 'Konto oszczędnościowe'
      case 'youth':
        return 'Konto dla młodzieży'
      default:
        return type
    }
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Twoje Konta</CardTitle>
        <NewAccountModal />
      </CardHeader>
      <CardContent>
        <Carousel setApi={setApi}>
          <CarouselPrevious />

          <CarouselContent>
            {loading ? (
              <CarouselItem>
                <Card className="flex size-full flex-col gap-2 p-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                      <Skeleton className="h-6 w-80" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="mb-2 h-6 w-32" />
                    <Skeleton className="h-5 w-40" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ) : (
              accounts &&
              accounts.map((account) => (
                <CarouselItem key={account.id}>
                  <Card className="m-px flex flex-col gap-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{account.name}</CardTitle>
                        <CardTitle style={{ fontSize: '0.875rem', color: 'lightgray' }}>
                          {translateAccountType(account.type)}
                        </CardTitle>
                      </div>

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
              ))
            )}
          </CarouselContent>

          <CarouselNext />
        </Carousel>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Konto {selectedIndex + 1} z {accounts?.length || 0}
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
  )
}
