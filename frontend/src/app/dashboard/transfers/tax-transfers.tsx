import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { TaxTransferForm } from "@/components/forms/transfers/tax-transfer-form"
import { TicketTransferForm } from "@/components/forms/transfers/ticket-transfer-form"

const tabs = [
  { id: "tickets", label: "Mandaty", form: <TicketTransferForm /> },
  { id: "tax", label: "PIT, CIT, VAT", form: <TaxTransferForm /> },
]

export function TaxTransfers() {
  return (
    <Tabs className="w-full" defaultValue="tax">
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
  )
}
