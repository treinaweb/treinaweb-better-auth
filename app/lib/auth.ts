import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";


export const auth = betterAuth({
  database: prismaAdapter(new PrismaClient(), { provider: "sqlite" }),
});
