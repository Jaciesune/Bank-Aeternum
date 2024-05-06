import "next-auth"
import type { User } from "next-auth"
import { Interface } from "readline"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
    accessToken?: string
  }

  interface User {
    email: string
    first_name: string
    last_name: string
    email_verified_at: string
    pesel: string
    phone: string
    address: Address
  }

  interface Address {
    street: string
    house_number: string
    apartment_number: string
    postal_code: string
    city: string
    country: string
    full_address: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    accessToken: string
    accessTokenExpires: number
  }
}
