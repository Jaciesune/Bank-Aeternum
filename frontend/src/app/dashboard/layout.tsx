import { ModeToggle } from "@/components/mode-theme"
import UserNavigation from "@/components/user-navigation"
import Link from "next/link"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <header className="flex items-center justify-between space-x-2 p-4 shadow-lg">
        <Link href="/" className="mr-auto">
          Bank Aeternum
        </Link>

        <UserNavigation />

        <ModeToggle />
      </header>

      <main className="container mt-6">{children}</main>
    </div>
  )
}
