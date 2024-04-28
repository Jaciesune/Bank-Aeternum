"use client"

import type { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import fetchClient from "@/lib/fetch-client"
