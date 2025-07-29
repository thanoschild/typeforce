import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "db/src";
import { AdapterUser } from "next-auth/adapters";
import { incrementStat } from "@/actions/stats";
import { nanoid } from 'nanoid';

export function CustomPrismaAdapter() {
  return {
    ...PrismaAdapter(prisma),

    async createUser(data: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
        include: { accounts: true },
      });

      if (existingUser) {
        const provider =
          existingUser.accounts[0]?.provider || "your existing method";
        throw new Error(
          `This email is already registered. Please sign in with ${provider}.`
        );
      }

      incrementStat('totalUsers');
      return await prisma.user.create({
        data: {
          name: data.name ?? data.email.split("@")[0],
          username: data.email.split("@")[0] + nanoid(6),
          email: data.email,
          image: data.image,
        },
      });
    },
  };
}
