"use client"

import { ArrowDownUp, HandCoins, Settings } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

type Component = {
  title: string
  href: string
  description: string
  icon: React.ReactNode
}

const components: Component[] = [
  {
    title: "Przelewy",
    href: "/dashboard/transfers",
    description: "Zarządzaj swoimi przelewami.",
    icon: <ArrowDownUp />,
  },
  {
    title: "Kredyty",
    href: "/dashboard/loans",
    description: "Zarządzaj swoimi kredytami.",
    icon: <HandCoins />,
  },
]

const accountComponents: Component[] = [
  {
    title: "Ustawienia",
    href: "/dashboard/settings",
    description: "Zarządzaj ustawieniami swojego konta.",
    icon: <Settings />,
  },
]

export default function UserNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Operacje</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Konto</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1">
              {accountComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button onClick={() => signOut()} variant="ghost">
            Wyloguj
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type ListItemProps = {
  title: string
  href: string
  icon: React.ReactNode
}

const ListItem = ({
  title,
  children,
  href,
  icon,
}: React.PropsWithChildren<ListItemProps>) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className="group flex select-none items-center gap-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          href={href}
        >
          <div className="flex items-center justify-center text-muted-foreground duration-200 group-hover:text-accent-foreground">
            {icon}
          </div>

          <div>
            <div className="text-md mb-1 font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
