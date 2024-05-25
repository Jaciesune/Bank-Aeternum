import { type } from "os"

export type Account = {
  id: number
  name: string
  account_number: string
  balance: number
  currency: string
  type: string
}

export type Symbol = {
  symbol: string
  form_title: string
  payment_type: string
}

export type TaxOffice = {
  province: string
  office_code: string
  office_name: string
  street: string
  number: string
  postcode: string
  town: string
  bank_account_type: string
  bank_account_number: string
}

export type Loan = {
  id: number
  user_id: number
  amount: number
  interest_rate: number
  duration: number
  status: string
  created_at: string
  installment: number
}

export type Status = "pending" | "completed" | "failed"
export type TransactionType = "domestic" | "own" | "ticket" | "tax" | "foreign"

export type Transaction = {
  id: number
  title: string
  amount: number
  currency: string
  type: TransactionType
  from_account: string
  to_account: string
  status: Status
  created_at: string
  updated_at: string
  user_id: string
  account_id: string
}

export type Notification = {
  id: number
  title: string
  content: string
  created_at: string
  read: boolean
}
