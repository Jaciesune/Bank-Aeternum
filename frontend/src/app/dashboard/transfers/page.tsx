import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DomesticTransferForm } from "@/components/forms/transfers/domestic-transfer-form"
import { ForeignTransferForm } from "@/components/forms/transfers/foreign-transfer-form"
import { OwnTransferForm } from "@/components/forms/transfers/own-transfer-form"

import { TaxTransfers } from "./tax-transfers"

const tabs = [
  { id: "domestic", label: "Krajowy", form: <DomesticTransferForm /> },
  { id: "own", label: "Własny", form: <OwnTransferForm /> },
  { id: "tax", label: "Podatkowy", form: <TaxTransfers /> },
  { id: "foreign", label: "Zagraniczny", form: <ForeignTransferForm /> },
]

export default async function Page() {
  return (
    <div>
      <h1 className="my-4 text-4xl font-semibold">Przelewy</h1>

      <Tabs className="w-full" defaultValue="domestic">
        <TabsList className="sticky top-4 flex">
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
