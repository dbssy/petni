import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: {
        orderId: 'desc',
      },
      include: {
        customer: true,
        pet: true,
        serviceType: true,
      },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { customerId, petId, serviceTypeId, status } = await req.json();

    const serviceType = await db.serviceType.findUnique({
      where: {
        id: serviceTypeId,
      },
    });

    if (!serviceType) {
      return new NextResponse('Not found', { status: 404 });
    }

    const service = await db.service.create({
      data: {
        customerId,
        petId,
        serviceTypeId,
        status,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log('[SERVICES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
