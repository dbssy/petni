import bcryptjs from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcryptjs.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;
