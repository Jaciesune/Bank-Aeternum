import SubmitButton from "@/components/shared/submit-button"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type AccountType = "checking" | "savings" | "credit_card"

type FormValues = {
  name: string
  account_type: AccountType
}

export default function NewAccountModal() {
  const form = useForm<FormValues>({
    defaultValues: {},
  })

  return (
    <Form {...form}>
      <form>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 size-4" />
              Nowe konto
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>Otwórz nowe konto</DrawerTitle>
                <DrawerDescription>
                  Wypełnij formularz, aby otworzyć nowe konto.
                </DrawerDescription>
              </DrawerHeader>

              <div className="space-y-4 p-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="account_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typ konta</FormLabel>
                      <FormControl>
                        <RadioGroup {...field}>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="personal" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Konto osobiste
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="savings" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Konto oszczędnościowe
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="youth" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Konto dla młodzieży
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter className="flex w-full flex-row justify-end gap-2">
                <DrawerClose asChild>
                  <Button variant="outline">Anuluj</Button>
                </DrawerClose>
                <SubmitButton
                  form={form}
                  className="flex items-center space-x-2"
                  loadingText="Otwieranie konta..."
                  buttonText="Otwórz konto"
                />
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </form>
    </Form>
  )
}
