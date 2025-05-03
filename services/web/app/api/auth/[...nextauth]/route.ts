import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, getUserById } from "@/actions/user";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "db/src";
import bcrypt from "bcryptjs";
import { validateForm } from "@/lib/validation";
import { CustomPrismaAdapter } from "@/actions/prismaAdapter";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account consent",
          access_type: "offline",
          response_type: "code",
          include_granted_scopes: true,
        },
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const validation = validateForm(credentials);
        if (Object.keys(validation).length > 0) {
          return null;
        }

        const { email, password } = credentials;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Allow credentials provider to work normally
        if (account?.provider === "credentials") {
          return true;
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true },
        });
    
        if (existingUser) {
          const registeredProvider = existingUser.accounts[0]?.provider;
  
          if (account?.provider !== registeredProvider) {
            return `/auth?error=provider_error`;
          }
        }
    
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return `/auth?error=internal_error`;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image ?? null
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.image = token.image ?? null
      }
      return session;
    },
  },
  adapter: CustomPrismaAdapter(),
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
