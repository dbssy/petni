import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = Promise<{ customerId: string }>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { customerId } = resolvedParams;

    const values = await req.json();

    if (values.phone) {
      const existingCustomer = await db.customer.findFirst({
        where: {
          phone: values.phone,
          NOT: {
            id: customerId,
          },
        },
      });

      if (existingCustomer) {
        return new NextResponse('Customer with this phone already exists!', {
          status: 409,
        });
      }
    }

    const customer = await db.customer.update({
      where: {
        id: customerId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log('[CUSTOMER_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { customerId } = resolvedParams;

    const customer = await db.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        pets: true,
        services: true,
      },
    });

    if (!customer) {
      return new NextResponse('Not found', { status: 404 });
    }

    const deletedCustomer = await db.customer.delete({
      where: {
        id: customer.id,
      },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log('[CUSTOMER_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
