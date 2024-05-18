import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const jwt = {
  decode: (token: string | undefined) => {
    if (!token) return

    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
  },
}

export function formatBankAccountNumber(bankAccountNumber: string) {
  const firstTwoDigits = bankAccountNumber.slice(0, 2)
  const restOfNumber = bankAccountNumber.slice(2)

  const formattedRest = restOfNumber.replace(/(\d{4})(?=\d)/g, "$1 ")

  return firstTwoDigits + " " + formattedRest
}
