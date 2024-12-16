import { getCustomersMetrics } from './get-customers-metrics';
import { getExpensesMetrics } from './get-expenses-metrics';
import { getHoursMetrics } from './get-hours-metrics';
import { getRevenueMetrics } from './get-revenue-metrics';
import { getServicesMetrics } from './get-services-metrics';

export async function getAllMetrics() {
  const { currentRevenue, revenueChange, revenueChangePercentage } =
    await getRevenueMetrics();

  const { currentExpenses, expenseChange, expenseChangePercentage } =
    await getExpensesMetrics();

  const { currentServices, servicesChange, servicesChangePercentage } =
    await getServicesMetrics();

  const { currentHours, hoursChange, hoursChangePercentage } =
    await getHoursMetrics();

  const { newCustomers, customersChange, customersChangePercentage } =
    await getCustomersMetrics();

  return {
    revenueMetrics: {
      currentRevenue,
      revenueChange,
      revenueChangePercentage,
    },
    expensesMetrics: {
      currentExpenses,
      expenseChange,
      expenseChangePercentage,
    },
    servicesMetrics: {
      currentServices,
      servicesChange,
      servicesChangePercentage,
    },
    hoursMetrics: {
      currentHours,
      hoursChange,
      hoursChangePercentage,
    },
    customersMetrics: {
      newCustomers,
      customersChange,
      customersChangePercentage,
    },
  };
}
