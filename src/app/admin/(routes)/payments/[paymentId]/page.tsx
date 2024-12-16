import { redirect } from 'next/navigation';

import { PaymentForm } from '../_components/payment-form';

import { db } from '@/lib/db';

type Params = Promise<{ paymentId: string }>;

export default async function PaymentPage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { paymentId } = resolvedParams;

  const payment = await db.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      services: {
        include: {
          serviceType: true,
        },
      },
    },
  });

  if (!payment) {
    return redirect('/admin/payments');
  }

  const services = await db.service.findMany({
    orderBy: {
      orderId: 'desc',
    },
    include: {
      serviceType: true,
    },
  });

  const type = payment.type === 'INCOME' ? 'INCOME' : 'EXPENSE';

  return (
    <PaymentForm
      payment={{
        ...payment,
        service: payment.services[0],
      }}
      services={type === 'INCOME' ? services : undefined}
      type={type}
    />
  );
}
