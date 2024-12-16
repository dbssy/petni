import { db } from '@/lib/db';

import { formatHours } from '@/lib/format';

export async function getHoursMetrics() {
  const lastMonthStart = new Date(
    new Date().setMonth(new Date().getMonth() - 1, 1),
  );
  const lastMonthEnd = new Date(new Date().setMonth(new Date().getMonth(), 0));

  const currentHoursData = await db.service.aggregate({
    _sum: { duration: true },
    where: {
      status: 'DONE',
      endAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth(), 1)),
        lte: new Date(),
      },
    },
  });

  const currentHoursInSeconds = currentHoursData._sum.duration || 0;
  const currentHours = formatHours(currentHoursInSeconds);

  const lastMonthHoursData = await db.service.aggregate({
    _sum: { duration: true },
    where: {
      status: 'DONE',
      endAt: { gte: lastMonthStart, lte: lastMonthEnd },
    },
  });

  const lastMonthHoursInSeconds = lastMonthHoursData._sum.duration || 0;
  const lastMonthHours = lastMonthHoursInSeconds / 3600;

  const hoursChange = currentHoursInSeconds / 3600 - lastMonthHours;

  const hoursChangePercentage =
    lastMonthHours > 0 ? ((hoursChange / lastMonthHours) * 100).toFixed(2) : 0;

  return {
    currentHours,
    hoursChange,
    hoursChangePercentage,
  };
}
