"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import Faq from "./faq"

export default function Page() {
  return (
    <>
      <section className="container mx-auto flex max-w-[980px] flex-col items-center gap-2 pt-24">
        <div className="inline-flex items-center rounded-lg bg-muted px-2 py-1 text-sm font-semibold">
         Bank Aeternum
        </div>
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:block md:text-5xl lg:leading-[1.1]">
          Bankowość internetowa dla każdego
        </h1>
        <span
          className="max-w-[750px] text-center text-lg font-light text-foreground"
          style={{
            display: "inline-block",
            verticalAlign: "top",
            textDecoration: "inherit",
            maxWidth: "494px",
          }}
        >
          Zarządzanie finansami jeszcze nigdy nie było tak proste. Jesteśmy
          liderem w branży bankowości internetowej, a nasze rozwiązania są
          dostępne w każdym zakątku świata.
        </span>
        <div className="flex w-full items-center justify-center gap-x-4 py-4 md:pb-10">
          <Button asChild>
            <Link href="/login">Zaloguj</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/register">Zarejestruj</Link>
          </Button>
        </div>
      </section>

      <Faq />
    </>
  )
}
