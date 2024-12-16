import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = Promise<{ userId: string }>;

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { userId } = resolvedParams;

    const values = await req.json();
    const { email, name, password } = values;

    if (email) {
      const existingUser = await db.user.findFirst({
        where: {
          email,
          NOT: { id: userId },
        },
      });

      if (existingUser) {
        return new NextResponse('User with this email already exists!', {
          status: 409,
        });
      }
    }

    const updateData: UpdateUserData = { name, email };

    if (password) {
      updateData.password = await bcryptjs.hash(password, 8);
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('[USER_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { userId } = resolvedParams;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse('Not found', { status: 404 });
    }

    const deletedUser = await db.user.delete({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log('[USER_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
