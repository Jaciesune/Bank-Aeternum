import { useEffect, useState } from "react"

import fetchClient from "@/lib/fetch-client"

type FetchingResult<T> = {
  loading: boolean
  data: T | null
  error: Error | null
}

const useDataFetching = <T>(url: string): FetchingResult<T> => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetchClient({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
        })

        const responseData: T = await response.json()
        setData(responseData)
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Unknown error occurred")
        )
      }
      setLoading(false)
    }

    fetchData()
  }, [url])

  return { loading, data, error }
}

export default useDataFetching
