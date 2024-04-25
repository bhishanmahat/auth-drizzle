import type {NextAuthConfig} from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas/formSchema"
import { getUserByEmail } from "./data/user"

export default {
    providers: [
        Credentials({
            async authorize(credentails) {
                const validatedFields = LoginSchema.safeParse(credentails);

                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig