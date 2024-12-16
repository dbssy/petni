'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn } from '@/auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { LoginSchema } from '@/schemas';

export async function Login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Email ou senha estão incorretos!' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email ou senha estão incorretos!' };
        default:
          return { error: 'Ocorreu um erro interno, tente novamente!' };
      }
    }

    throw error;
  }
}
