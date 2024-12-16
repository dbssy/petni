import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = (url.searchParams.get('type') || 'INCOME') as
    | 'INCOME'
    | 'EXPENSE';

  const query: Prisma.PaymentFindManyArgs = {
    where: { type },
  };

  if (type === 'INCOME') {
    query.include = {
      services: {
        include: {
          serviceType: true,
          customer: true,
        },
      },
    };
  }

  try {
    const payments = await db.payment.findMany(query);
    return NextResponse.json(payments);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { serviceId, name, value, methodType, type, paidAt, status } =
      await req.json();

    const payment = await db.payment.create({
      data: {
        name: name || null,
        value,
        methodType,
        type,
        paidAt: paidAt || null,
        status,
        ...(type === 'INCOME' &&
          serviceId && {
            services: {
              connect: {
                id: serviceId,
              },
            },
          }),
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.log('[PAYMENTS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
