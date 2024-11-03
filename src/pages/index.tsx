import AddTransactionForm from '@/components/AddTransactionForm';
import { columns, Transaction } from '@/components/transactionsTable/columns';
import DataTable from '@/components/transactionsTable/DataTable';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

async function getData(): Promise<Transaction[]> {
  return [];
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    (async function () {
      const data = await getData();
      setTransactions(data);
    })();
  }, []);

  return (
    <Card className="min-w-screen-sm mx-auto">
      <CardHeader>
        <CardTitle>Extratify</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-12">
        <div>
          <AddTransactionForm setTransactions={setTransactions} />
        </div>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <h2>footer</h2>
      </CardFooter>
    </Card>
  );
}
