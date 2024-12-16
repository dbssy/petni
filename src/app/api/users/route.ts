import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse('User with this email already exists!', {
        status: 409,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USERS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
