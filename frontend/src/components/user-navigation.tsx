"use client"

import Link from "next/link"
import React, { forwardRef } from "react"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// import { signOut } from "next-auth/react"
//     <li>
//       <button
//         type="button"
//         onClick={() => signOut()}
//       >
//         Sign out
//       </button>

type Component = {
  title: string
  href: string
  description: string
}

const components: Component[] = [
  {
    title: "Przelewy",
    href: "/dashboard/transfers",
    description: "Zarządzaj swoimi przelewami.",
  },
  {
    title: "Karty",
    href: "/dashboard/cards",
    description: "Zarządzaj swoimi kartami płatniczymi.",
  },
]

const accountComponents: Component[] = [
  {
    title: "Zarządzaj kontem",
    href: "/dashboard/account",
    description: "Zarządzaj swoimi danymi osobowymi.",
  },
  {
    title: "Ustawienia",
    href: "/dashboard/settings",
    description: "Zarządzaj ustawieniami swojego konta.",
  },
  {
    title: "Wyloguj",
    href: "/api/auth/signout",
    description: "Wyloguj się z konta.",
  },
]

export default function UserNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Informacje</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
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
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {accountComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Wyloguj
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type ListItemProps = {
  title: string
  href: string
}
const ListItem = ({
  title,
  children,
  href,
}: React.PropsWithChildren<ListItemProps>) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
