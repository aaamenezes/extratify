import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dispatch, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Transaction } from '../transactionsTable/columns';

export default function AddTransactionForm({
  setTransactions,
}: {
  setTransactions: Dispatch<React.SetStateAction<Transaction[]>>;
}) {
  const addTransactionSchema = z.object({
    type: z.string(),
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
      type: 'Despesa',
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
    [setTransactions, addTransactionForm]
  );

  return (
    <Form {...addTransactionForm}>
      <form
        onSubmit={addTransactionForm.handleSubmit(handleSubmitAddTransaction)}
        className="flex justify-between items-center"
      >
        <FormField
          control={addTransactionForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de transação</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de transação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Despesa">Despesa</SelectItem>
                  <SelectItem value="Receita">Receita</SelectItem>
                  <SelectItem value="Transferência">Transferência</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Despesa, receita ou transferência entre contas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
  );
}
