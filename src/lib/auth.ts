import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

export const auth = betterAuth({
  database: memoryAdapter({
    user: [],
    session: [],
    account: [],
    verification: [],
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
});

export type Session = typeof auth.$Infer.Session;
