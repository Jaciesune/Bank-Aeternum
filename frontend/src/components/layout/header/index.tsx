import { Landmark } from "lucide-react"
import Link from "next/link"

import { ModeToggle } from "./mode-theme"

type HeaderProps = {
  navigation?: React.ReactNode
}

export default function Header({ navigation }: HeaderProps) {
  return (
    <header className="border-background-muted flex items-center justify-between space-x-2 border-b p-4 shadow-sm">
      <Link
        href="/"
        className="mr-auto flex items-center text-xl font-semibold text-accent-foreground duration-300 hover:translate-x-2"
      >
        <Landmark className="mr-3" />
        Bank Aeternum
      </Link>

      {navigation}

      <ModeToggle />
    </header>
  )
}
