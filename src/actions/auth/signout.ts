'use server';

import { signOut } from '@/auth';

export async function ServerSignout() {
  await signOut({
    redirectTo: '/auth/signin',
  });
}
