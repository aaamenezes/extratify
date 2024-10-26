import { columns, Transaction } from '@/components/transactionsTable/columns';
import DataTable from '@/components/transactionsTable/DataTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

async function getData(): Promise<Transaction[]> {
  return [
    // {
    //   description: 'Cerveja',
    //   value: '10',
    // },
    // {
    //   description: 'Cafe',
    //   value: '20',
    // },
    // {
    //   description: 'Leite',
    //   value: '30',
    // },
    // {
    //   description: 'Suco',
    //   value: '40',
    // },
  ];
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    (async function () {
      const data = await getData();
      setTransactions(data);
    })();
  }, []);

  const addTransactionSchema = z.object({
    description: z.string().min(3, {
      message: 'Descrição muito curta',
    }),
    account: z.string(),
    value: z.string().min(1),
  });

  const addTransactionForm = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      description: '',
      account: '',
      value: '0',
    },
  });

  const handleSubmitAddTransaction = useCallback(
    (values: z.infer<typeof addTransactionSchema>) => {
      setTransactions((prev) => [...prev, values]);
      addTransactionForm.reset();
    },
    [addTransactionForm]
  );

  return (
    <Card className="max-w-screen-sm mx-auto">
      <CardHeader>
        <CardTitle>Extratify</CardTitle>
        <CardDescription>Adicionar lançamento</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-12">
        <Form {...addTransactionForm}>
          <form
            onSubmit={addTransactionForm.handleSubmit(
              handleSubmitAddTransaction
            )}
            className="flex justify-between items-center"
          >
            <FormField
              control={addTransactionForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Cerveja" {...field} />
                  </FormControl>
                  <FormDescription>Descreva a sua transação</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta</FormLabel>
                  <FormControl>
                    <Input placeholder="Carteira" {...field} />
                  </FormControl>
                  <FormDescription>
                    Em qual conta o valor foi movimentado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="100,00" {...field} />
                  </FormControl>
                  <FormDescription>
                    Informe o valor da sua transação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Adicionar</Button>
          </form>
        </Form>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <h2>footer</h2>
      </CardFooter>
    </Card>
  );
}
