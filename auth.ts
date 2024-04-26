import NextAuth, { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { authConfig } from "@/auth.config";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle/db";

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/formSchema";
import { getUserByEmail } from "./data/user";
import { getUserById } from "./data/user";
import bcrypt from "bcryptjs";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // Might have to refine the typescript error other than making it not null
      token.role = existingUser.role!;

      return token;
    },
  },
  providers: [
    Credentials({
      async authorize(credentails) {
        const parsedCredentials = LoginSchema.safeParse(credentails);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
});
