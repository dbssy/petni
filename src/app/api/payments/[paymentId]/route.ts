import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = Promise<{ paymentId: string }>;

interface PaymentData {
  serviceId?: string;
  name?: string;
  value: number;
  methodType: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'MONEY' | 'ANOTHER';
  type: 'INCOME' | 'EXPENSE';
  paidAt?: string;
  status: 'AWAITING_PAYMENT' | 'PAID';
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { paymentId } = resolvedParams;

    const values: PaymentData = await req.json();

    const { serviceId, ...paymentData } = values;

    const updateData: Omit<PaymentData, 'serviceId'> & {
      services?: { set: { id: string }[] };
    } = {
      ...paymentData,
    };

    if (serviceId) {
      updateData.services = {
        set: [{ id: serviceId }],
      };
    }

    const payment = await db.payment.update({
      where: {
        id: paymentId,
      },
      data: updateData,
      include: {
        services: true,
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.log('[PAYMENT_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { paymentId } = resolvedParams;

    const payment = await db.payment.findUnique({
      where: {
        id: paymentId,
      },
    });

    if (!payment) {
      return new NextResponse('Not found', { status: 404 });
    }

    const deletedPayment = await db.payment.delete({
      where: {
        id: payment.id,
      },
    });

    return NextResponse.json(deletedPayment);
  } catch (error) {
    console.log('[PAYMENT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
