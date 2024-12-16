import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ExpensesTab } from './_components/expenses/expenses-tab';
import { IncomesTab } from './_components/incomes/incomes-tab';

export default function PaymentsPage() {
  return (
    <>
      <Tabs defaultValue="incomes">
        <TabsList>
          <TabsTrigger value="incomes">Receitas</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
        </TabsList>

        <IncomesTab />
        <ExpensesTab />
      </Tabs>
    </>
  );
}
