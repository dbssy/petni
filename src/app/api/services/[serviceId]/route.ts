/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = Promise<{ serviceId: string }>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { serviceId } = resolvedParams;

    const service = await db.service.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        serviceType: true,
      },
    });

    if (!service) {
      return new NextResponse('Not found!', { status: 404 });
    }

    const values = await req.json();

    const updateData: any = {
      customerId: values.customerId,
      petId: values.petId,
      serviceTypeId: values.serviceTypeId,
      status: values.status,
    };

    if (values.status === 'DONE') {
      const endAt = new Date();

      const duration = Math.floor(
        (endAt.getTime() - service.startAt.getTime()) / 1000,
      );

      updateData.endAt = endAt;
      updateData.duration = duration;

      await db.payment.create({
        data: {
          name: `Pagamento - ${service.serviceType.name}`,
          value: service.serviceType.price,
          methodType: 'PIX',
          status: 'AWAITING_PAYMENT',
          services: {
            connect: {
              id: serviceId,
            },
          },
        },
      });
    }

    const updatedService = await db.service.update({
      where: {
        id: serviceId,
      },
      data: updateData,
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.log('[SERVICE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { serviceId } = resolvedParams;

    const service = await db.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return new NextResponse('Not found', { status: 404 });
    }

    const deletedCustomer = await db.service.delete({
      where: {
        id: service.id,
      },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log('[SERVICE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
