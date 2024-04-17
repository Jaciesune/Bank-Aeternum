import { ModeToggle } from "@/components/mode-theme"
import GuestNavigation from "@/components/guest-navigation"
import Link from "next/link"

interface GuestLayoutProps {
  children?: React.ReactNode
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <>
      <header className="flex items-center justify-between space-x-2 p-4 shadow-lg">
        <Link href="/" className="mr-auto">
          Bank Aeternum
        </Link>

        <GuestNavigation />

        <ModeToggle />

      </header>


      <main>{children}</main>
    </>
  )
}
