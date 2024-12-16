import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
  try {
    const customers = await db.customer.findMany({
      orderBy: { name: 'asc' },
      include: { pets: true },
    });
    return NextResponse.json(customers);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    const existingCustomer = await db.customer.findUnique({
      where: {
        phone,
      },
    });

    if (existingCustomer) {
      return new NextResponse('Customer with this phone already exists!', {
        status: 409,
      });
    }

    const customer = await db.customer.create({
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log('[CUSTOMERS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
