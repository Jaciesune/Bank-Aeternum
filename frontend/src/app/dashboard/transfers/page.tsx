import { getCurrentUser } from "@/lib/session"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DomesticTransferForm } from "@/components/forms/transfers/domestic-transfer-form"
import { ForeignTransferForm } from "@/components/forms/transfers/foreign-transfer-form"
import { OwnTransferForm } from "@/components/forms/transfers/own-transfer-form"
import { TaxTransferForm } from "@/components/forms/transfers/tax-transfer-form"

const tabs = [
  { id: "domestic", label: "Krajowy", form: <DomesticTransferForm /> },
  { id: "own", label: "Własny", form: <OwnTransferForm /> },
  { id: "tax", label: "Podatkowy", form: <TaxTransferForm /> },
  { id: "foreign", label: "Zagraniczny", form: <ForeignTransferForm /> },
]

export default async function Page() {
  const user = await getCurrentUser()

  return (
    <div>
      <h1 className="my-4 text-4xl font-semibold">Przelewy</h1>

      <Tabs className="w-full" defaultValue="domestic">
        <TabsList className="flex">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex-1">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.form}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
