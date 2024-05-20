export type Account = {
  id: number
  name: string
  account_number: string
  balance: number
  currency: string
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
}