"use client"

import { useEffect, useState } from "react"
import { DollarSign } from "react-feather"

import fetchClient from "@/lib/fetch-client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Page = () => {
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      console.log("Hello World")
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/account`,
        })
        const data = await response.json()
        setBalance(data.balance)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Balans Konta */}
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Balans Konta
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance}</div>
            </CardContent>
          </Card>
          {/* Powiadomienia */}
          <Card className="col-span-1 flex-grow">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Powiadomienia</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1"></Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          {/* Historia Transakcji */}
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Historia Transakcji</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1"></Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Page
