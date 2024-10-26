import { columns, Transaction } from '@/components/transactionsTable/columns';
import DataTable from '@/components/transactionsTable/DataTable';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const addTransactionSchema = z.object({
    date: z.date(),
    description: z.string().min(3, {
      message: 'Descrição muito curta',
    }),
    category: z.string(),
    account: z.string(),
    value: z.string().min(1),
  });

  const addTransactionForm = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      date: new Date(),
      description: '',
      category: '',
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Data da sua transação</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Educação, saúde, etc" {...field} />
                  </FormControl>
                  <FormDescription>Grupo de gastos</FormDescription>
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
