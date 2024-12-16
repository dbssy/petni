import { db } from '@/lib/db';

export async function getExpensesMetrics() {
  const lastMonthStart = new Date(
    new Date().setMonth(new Date().getMonth() - 1, 1),
  );

  const lastMonthEnd = new Date(new Date().setMonth(new Date().getMonth(), 0));

  const currentExpensesData = await db.payment.aggregate({
    _sum: { value: true },
    where: {
      type: 'EXPENSE',
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth(), 1)),
        lte: new Date(),
      },
    },
  });

  const currentExpenses = currentExpensesData._sum.value || 0;

  const lastMonthExpensesData = await db.payment.aggregate({
    _sum: { value: true },
    where: {
      type: 'EXPENSE',
      createdAt: { gte: lastMonthStart, lte: lastMonthEnd },
    },
  });

  const lastMonthExpenses = lastMonthExpensesData._sum.value || 0;

  const expenseChange = currentExpenses - lastMonthExpenses;

  const expenseChangePercentage =
    lastMonthExpenses > 0
      ? ((expenseChange / lastMonthExpenses) * 100).toFixed(2)
      : currentExpenses > 0
      ? '100'
      : '0';

  return {
    currentExpenses,
    expenseChange,
    expenseChangePercentage,
  };
}
