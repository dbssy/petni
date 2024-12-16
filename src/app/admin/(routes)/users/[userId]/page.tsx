import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { UserForm } from './_components/user-form';

type Params = Promise<{ userId: string }>;

export default async function CustomerPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { userId } = resolvedParams;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return redirect('/admin/users');
  }

  return <UserForm user={user} />;
}
