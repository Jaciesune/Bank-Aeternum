"use client"

import { useState } from "react"

import type { Account } from "@/types"

import Accounts from "./accounts"
import Notifications from "./notifications"
import TransactionsHistory from "./transactions-history"

const Page = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  return (
    <div className="grid grid-cols-3 gap-4">
      <Accounts setSelectedAccount={setSelectedAccount} />
      <Notifications />
      <TransactionsHistory account={selectedAccount} />
    </div>
  )
}

export default Page
