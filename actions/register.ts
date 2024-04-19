"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas/formSchema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "User created!" };
};
