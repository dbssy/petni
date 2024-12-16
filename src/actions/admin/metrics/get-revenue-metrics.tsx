import { db } from '@/lib/db';

export async function getRevenueMetrics() {
  const lastMonthStart = new Date(
    new Date().setMonth(new Date().getMonth() - 1, 1),
  );

  const lastMonthEnd = new Date(new Date().setMonth(new Date().getMonth(), 0));

  const currentRevenueData = await db.payment.aggregate({
    _sum: { value: true },
    where: {
      type: 'INCOME',
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth(), 1)),
        lte: new Date(),
      },
    },
  });

  const currentRevenue = currentRevenueData._sum.value || 0;

  const lastMonthRevenueData = await db.payment.aggregate({
    _sum: { value: true },
    where: {
      type: 'INCOME',
      createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
    },
  });

  const lastMonthRevenue = lastMonthRevenueData._sum.value || 0;

  const revenueChange = currentRevenue - lastMonthRevenue;

  const revenueChangePercentage =
    lastMonthRevenue > 0
      ? ((revenueChange / lastMonthRevenue) * 100).toFixed(2)
      : currentRevenue > 0
      ? '100'
      : '0';

  return {
    currentRevenue,
    revenueChange,
    revenueChangePercentage,
  };
}
