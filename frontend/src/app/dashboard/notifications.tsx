import useDataFetching from "@/hooks/useDataFetching"
import { format } from "date-fns"

import type { Notification } from "@/types"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export default function Notifications() {
  const { data: notifications, loading } =
    useDataFetching<Notification[]>("/api/notification")

  return (
    <Card className="col-span-1 grow">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Powiadomienia</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1"></Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px]">
          {loading ? (
            <div className="grid gap-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-4 w-14" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Skeleton className="h-4 w-14" />
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="grid gap-2">
              {notifications &&
                notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {notification.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        {notification.content}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end text-xs text-muted-foreground">
                      {format(notification.created_at, "dd.MM.yyyy HH:mm")}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
