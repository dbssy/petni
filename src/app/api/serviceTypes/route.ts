import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderBy = url.searchParams.get('orderBy') || 'name';

  try {
    const serviceTypes = await db.serviceType.findMany({
      orderBy: {
        [orderBy]: 'asc',
      },
    });

    return NextResponse.json(serviceTypes);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch service types' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, price } = await req.json();

    const serviceType = await db.serviceType.create({
      data: {
        name,
        price,
      },
    });

    return NextResponse.json(serviceType);
  } catch (error) {
    console.log('[SERVICES_TYPE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
