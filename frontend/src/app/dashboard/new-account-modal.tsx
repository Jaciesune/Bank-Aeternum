import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import fetchClient from "@/lib/fetch-client";
import useDataFetching from "@/hooks/useDataFetching";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { Account } from "next-auth";

type AccountType = "personal" | "savings" | "youth";

type FormValues = {
  name: string;
  account_type: AccountType;
};

const NewAccountForm: React.FC = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      account_type: "personal",
    },
  });

  const { data: accounts, loading, error } = useDataFetching<Account[]>("/api/account");

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetchClient({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/account`,
        body: JSON.stringify({
          name: values.name,
          type: values.account_type,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Konto zostało otwarte pomyślnie.");
      form.reset();
    } catch (error) {
      toast.error("Wystąpił błąd podczas otwierania konta.");
    }
  };

  return (
    <Form {...form}>
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter className="flex w-full flex-row justify-end gap-2">
                <DrawerClose asChild>
                  <Button variant="outline">Anuluj</Button>
                </DrawerClose>
                <Button type="submit">Otwórz konto</Button>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </Form>
  );
};

export default NewAccountForm;