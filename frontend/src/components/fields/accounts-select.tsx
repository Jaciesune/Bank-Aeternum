import { Check } from "lucide-react"
import { useState } from "react"

import { Account } from "@/types"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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

type AccountsSelectProps = {
  placeholder: string
  accounts: Account[]
  selectedValue: string
  onChangeValue: (value: string) => void
}

const formatAccountNumber = (accountNumber: string) =>
  accountNumber.replace(/(\d{4})/g, "$1 ")

export const AccountsSelect = ({
  placeholder,
  accounts,
  selectedValue,
  onChangeValue,
}: AccountsSelectProps) => {
  const [value, setValue] = useState(selectedValue)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [open, setOpen] = useState(false)

  const onAccept = () => {
    setValue(value)
    setSelectedAccount(
      accounts.find((account) => account.account_number === value) || null
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
              {placeholder}
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
              <ScrollArea className="max-h-[calc(100vh-_-200px)]">
                <div className="space-y-2">
                  {accounts.map((account) => (
                    <Card
                      key={account.id}
                      className={cn(
                        "cursor-pointer",
                        value === account.account_number && "bg-muted"
                      )}
                      onClick={() => {
                        setValue(account.account_number)
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
                        {value === account.account_number && (
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
