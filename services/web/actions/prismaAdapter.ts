import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "db/src";
import { AdapterAccount, AdapterUser } from "next-auth/adapters";

export function CustomPrismaAdapter() {
  return {
    ...PrismaAdapter(prisma),

    async createUser(data: Omit<AdapterUser, "id">): Promise<AdapterUser> {
        console.log("createUser called with email:", data.email);
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
        include: { accounts: true },
      });
      
      if (existingUser) {
        const provider = existingUser.accounts[0]?.provider || "your existing method";
        throw new Error(`This email is already registered. Please sign in with ${provider}.`);
      }

      return await prisma.user.create({
        data: {
          username: data.email.split("@")[0],
          email: data.email,
          image: data.image,
          emailVerified: data.emailVerified,
        },
      });
    },

    // async linkAccount(accountData: AdapterAccount): Promise<AdapterAccount> {
    //   const existingAccount = await prisma.account.findUnique({
    //     where: {
    //       provider_providerAccountId: {
    //         provider: accountData.provider,
    //         providerAccountId: accountData.providerAccountId,
    //       },
    //     },
    //   });

    //   if (existingAccount && existingAccount.userId !== accountData.userId) {
    //     throw new Error(`This ${accountData.provider} account is already linked to another user.`);
    //   }

    //   return await prisma.account.create({
    //     data: accountData,
    //   }) as AdapterAccount;
    // },

    // async getUserByAccount({provider, providerAccountId}: {provider: string; providerAccountId: string;}): Promise<AdapterUser | null> {
    //     console.log("getUserByAccount called for:", provider, providerAccountId);
    //   const account = await prisma.account.findUnique({
    //     where: {
    //       provider_providerAccountId: {
    //         provider,
    //         providerAccountId,
    //       },
    //     },
    //     include: { user: true },
    //   });
    //   return account?.user ?? null;
    // },
  };
}
