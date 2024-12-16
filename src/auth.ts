import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { db } from '@/lib/db';

import authConfig from '@/auth.config';

export const { auth, handlers, signOut, signIn } = NextAuth({
  callbacks: {},
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
