import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      // ...other custom properties
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    username?: string
    // ...other user properties
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    // ...other token properties
  }
}