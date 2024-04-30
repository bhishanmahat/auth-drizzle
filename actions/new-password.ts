"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas/formSchema";
import { db } from "@/drizzle/db";
import { passwordResetTokens, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const parsedFields = NewPasswordSchema.safeParse(values);

  if (!parsedFields.success) {
    return { error: "Invalid fields!" };
  }

  // Implement server side checking of "password and confirmPassword fields"
  const { password } = parsedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, existingUser.id));

  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.id, existingToken.id));

    return { success: "Password updated!"}
};
