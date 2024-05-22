"use client"

import type { Status as StatusType } from "@/types"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"

export default function Status({ status }: { status: StatusType }) {
  const statusMap: Record<StatusType, string> = {
    pending: "Oczekująca",
    completed: "Zakończona",
    failed: "Nieudana",
  }

  return (
    <Badge variant="outline">
      <div
        className={cn("mr-1 size-2 rounded-full", {
          "bg-green-500": status === "completed",
          "bg-yellow-500": status === "pending",
          "bg-red-500": status === "failed",
        })}
      />
      {statusMap[status]}
    </Badge>
  )
}
