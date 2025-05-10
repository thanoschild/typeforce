import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      image?: string | null
      username: string
      // ...other custom properties
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    username?: string
    image?: string | null
    emailVerified?: Date | null
    // ...other user properties
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    username: string
    image?: string | null
    // ...other token properties
  }
}