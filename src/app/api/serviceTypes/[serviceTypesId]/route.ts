import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = Promise<{ serviceTypesId: string }>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { serviceTypesId } = resolvedParams;

    const values = await req.json();

    const serviceType = await db.serviceType.update({
      where: {
        id: serviceTypesId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(serviceType);
  } catch (error) {
    console.log('[SERVICE_TYPE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { serviceTypesId } = resolvedParams;

    const serviceType = await db.serviceType.findUnique({
      where: {
        id: serviceTypesId,
      },
    });

    if (!serviceType) {
      return new NextResponse('Not found', { status: 404 });
    }

    const deletedServiceType = await db.serviceType.delete({
      where: {
        id: serviceType.id,
      },
    });

    return NextResponse.json(deletedServiceType);
  } catch (error) {
    console.log('[SERVICE_TYPE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
