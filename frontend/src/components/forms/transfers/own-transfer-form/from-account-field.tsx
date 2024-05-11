"use client"

import { Check, ChevronsUpDown, CircleCheck, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import fetchClient from "@/lib/fetch-client"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type Account = {
  id: number
  name: string
  account_number: string
  balance: number
  currency: string
}

type FromAccountFieldProps = {
  selectedValue: string
  onChangeValue: (value: string) => void
}

const formatAccountNumber = (accountNumber: string) =>
  accountNumber.replace(/(\d{4})/g, "$1 ")

const FromAccountField = ({selectedValue, onChangeValue}: FromAccountFieldProps) => {
  const [value, setValue] = useState("")
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [open, setOpen] = useState(false)

  const [accounts, setAccounts] = useState<Account[]>([])

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

  const onAccept = () => {
    setValue(value)
    setSelectedAccount(
      accounts.find((account) => account.name === value) || null
    )
    setOpen(false)
    onChangeValue(value)
  }

  const onAbort = () => {
    setValue("")
    setOpen(false)
  }

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onAbort()
    }

    setOpen(isOpen)
  }

  return (
    <Card
      className={cn(
        "flex items-center justify-between gap-4",
        !selectedAccount && "border-dashed"
      )}
    >
      <Card className="border-none p-0 shadow-none">
        {selectedAccount ? (
          <>
            <CardHeader>
              <CardTitle>{selectedAccount.name}</CardTitle>
              <CardDescription>
                {formatAccountNumber(selectedAccount.account_number)}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <div className="text-xl">
                {selectedAccount.balance}{" "}
                <span className="text-muted-foreground">
                  {selectedAccount.currency}
                </span>
              </div>
            </CardContent>
          </>
        ) : (
          <CardHeader>
            <CardDescription className="text-muted-foreground">
              Nie wybrano konta
            </CardDescription>
          </CardHeader>
        )}

        <CardContent>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
              <Button variant={selectedAccount ? "outline" : "default"}>
                {selectedAccount ? "Zmień konto" : "Wybierz konto"}
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wybierz konto</DialogTitle>
                <DialogDescription>
                  Wybierz konto, z którego chcesz wykonać przelew.
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(100vh_-_200px)]">
                <div className="space-y-2">
                  {accounts.map((account) => (
                    <Card
                      key={account.id}
                      className={cn(
                        "cursor-pointer",
                        value === account.name && "bg-muted"
                      )}
                      onClick={() => {
                        setValue(account.name)
                      }}
                    >
                      <CardHeader>
                        <CardTitle>{account.name}</CardTitle>
                        <CardDescription>
                          {formatAccountNumber(account.account_number)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <div className="text-xl">
                          {account.balance}{" "}
                          <span className="text-muted-foreground">
                            {account.currency}
                          </span>
                        </div>

                        {value === account.name && (
                          <Check className="text-green-600 dark:text-green-400" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <DialogFooter>
                <Button variant="outline" onClick={onAbort}>
                  Anuluj
                </Button>
                <Button onClick={onAccept} disabled={!value}>
                  Wybierz
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </Card>
  )
}

export default FromAccountField
