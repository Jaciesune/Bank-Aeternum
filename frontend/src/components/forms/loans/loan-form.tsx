"use client";
import React from 'react';
import { useForm } from "react-hook-form";
import fetchClient from "@/lib/fetch-client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type FormValues = {
  loan_amount: string;
  duration: string;
  installment_type: string;
};

export function LoanForm() {
  const form = useForm<FormValues>();

  async function onSubmit({
    loan_amount,
    duration,
    installment_type,
  }: FormValues) {
    try {
      const response = await fetchClient({
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/forgot-password",
        body: JSON.stringify({
          loan_amount,
          duration,
          installment_type,
        }),
      });

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      if (error instanceof Response) {
        const response = await error.json();

        if (!response.errors) {
          throw error;
        }

        return Object.keys(response.errors).map((errorKey) => {
          const input = document.querySelector(
            `[name="${errorKey}"]`
          ) as HTMLInputElement;
          input.setCustomValidity(response.errors[errorKey]);
          input.reportValidity();
        });
      }

      throw new Error("An error has occurred during the request");
    }
  }

  return (
    <div className="flex space-x-8 w-full">
      {/* Left Form (30% width) */}
      <div style={{ flex: "30%" }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8d">
            <CardContent>
              <table>
                <tbody>
                  <tr>
                    <td><FormLabel>Twoja rata miesięczna</FormLabel></td>
                    <td><div style={{ marginTop: "0.5rem" }}>636 zł</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>RRSO</FormLabel></td>
                    <td><div>12.28%</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>Kwota kredytowana</FormLabel></td>
                    <td><div>30 000 zł</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>Kwota do wypłaty</FormLabel></td>
                    <td><div>30 000 zł</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>Całkowity koszt kredytu</FormLabel></td>
                    <td><div>9 344 zł</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>Oprocentowanie</FormLabel></td>
                    <td><div>9.90%</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>Wpłata własna</FormLabel></td>
                    <td><div>0 zł</div></td>
                  </tr>
                  <tr>
                    <td><FormLabel>Ubezpieczenie kredytu</FormLabel></td>
                    <td><div>1 188 zł</div></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </form>
        </Form>
      </div>

      {/* Right Form (70% width) */}
      <div style={{ flex: "70%" }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8d">
            <CardContent>
              {/* Loan Amount */}
              <div className="flex space-x-4 items-center">
                <div style={{ flex: "30%" }}>
                  <FormField
                    control={form.control}
                    name="loan_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kwota wnioskowana</FormLabel>
                        <FormControl>
                          <Input placeholder="10000" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div style={{ flex: "70%", marginTop: "1.5rem" }}>
                  <Slider defaultValue={[30]} />
                </div>
              </div>

              {/* Duration */}
              <div className="flex space-x-4 items-center">
                <div style={{ flex: "30%" }}>
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Okres spłaty</FormLabel>
                        <FormControl>
                          <Input placeholder="60 miesięcy" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div style={{ flex: "70%", marginTop: "1.5rem" }}>
                  <Slider defaultValue={[70]} />
                </div>
              </div>

              {/* Loan Type*/}
              <FormField
                control={form.control}
                name="installment_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ rat</FormLabel>
                    <FormControl>
                      <Input placeholder="Raty równe" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Submit button */}
            <CardFooter>
              <Button className="w-full" type="submit">
                Wykonaj
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
}
