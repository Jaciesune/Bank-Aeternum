import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "react-feather";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Balans Konta */}
          <Card className="col-span-2" x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balans Konta</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
            </CardContent>
          </Card>
          {/* Powiadomienia */}
          <Card className="col-span-1 flex-grow" x-chunk="dashboard-01-chunk-2" style={{ height: "493%" }}>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Powiadomienia</CardTitle>
                <CardDescription>
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
              </Button>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
          {/* Historia Transakcji */}
          <Card className="col-span-2" x-chunk="dashboard-01-chunk-1" style={{ height: "400%" }}>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Historia Transakcji</CardTitle>
                <CardDescription>
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
              </Button>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
