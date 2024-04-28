"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { RegisterSchema } from "@/schemas/formSchema";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.insert(users).values({ name, email, password: hashedPassword });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email!,
    verificationToken.token!
  );

  return { success: "Email verification link sent!" };
};
