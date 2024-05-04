import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Transaction = {
  id: number
  amount: number
  currency?: string
  created_at: string
  account_id: number
  type: string
  status: "pending" | "success" | "failed"
  title: string
  reference?: string
  user: string
  account: string
}

type TransactionDetailsProps = {
  transaction: Transaction
}

export default function TransactionDetails({
  transaction,
}: TransactionDetailsProps) {
  const { amount, currency, created_at, type, status, title, user, account } =
    transaction

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Wyświetl szczegóły</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Szczegóły transakcji</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="transaction-title">Tytuł</Label>
            <Textarea
              id="transaction-title"
              value={title}
              disabled
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transaction-amount">Kwota</Label>
            <Input
              id="transaction-amount"
              value={`${amount} ${currency}`}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transaction-created-at">Data</Label>
            <Input
              id="transaction-created-at"
              value={format(created_at, "dd.MM.yyyy HH:mm")}
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transaction-type">Typ</Label>
            <Input id="transaction-type" value={type} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transaction-status">Status</Label>
            <Input id="transaction-status" value={status} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transaction-user">Od</Label>
            <Input id="transaction-user" value={user} disabled />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="transaction-account">Do</Label>
            <Input id="transaction-account" value={account} disabled />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Powtórz płatność</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
