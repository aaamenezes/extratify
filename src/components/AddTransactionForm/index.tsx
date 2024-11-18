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
import { Dispatch, useCallback, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Transaction } from '../transactionsTable/columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function AddTransactionForm({
  setTransactions,
}: {
  setTransactions: Dispatch<React.SetStateAction<Transaction[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    },
    [setTransactions, addTransactionForm]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Adicionar transação</Button>
      </DialogTrigger>
      <DialogContent className="bg-background max-h-[70vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription>
            (texto auxiliar para ajudar o usuário com informações úteis no
            momento de adicionar uma transação)
          </DialogDescription>
        </DialogHeader>
        <Form {...addTransactionForm}>
          <form
            onSubmit={addTransactionForm.handleSubmit(
              handleSubmitAddTransaction
            )}
            className="flex flex-col gap-8"
          >
            <FormField
              control={addTransactionForm.control}
              name="type"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[150px_1fr] items-center">
                  <FormLabel>Tipo de transação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de transação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Despesa">Despesa</SelectItem>
                      <SelectItem value="Receita">Receita</SelectItem>
                      <SelectItem value="Transferência">
                        Transferência
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="col-span-2 text-right">
                    O dinheiro saiu, entrou, ou mudou de conta? Aqui inclui
                    saques
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="date"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[150px_1fr] items-center">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'justify-start text-left font-normal',
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
                  <FormDescription className="col-span-2 text-right">
                    Data da sua transação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[150px_1fr] items-center">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Cerveja" {...field} />
                  </FormControl>
                  <FormDescription className="col-span-2 text-right">
                    Descreva a sua transação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="category"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[150px_1fr] items-center">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Educação, saúde, etc" {...field} />
                  </FormControl>
                  <FormDescription className="col-span-2 text-right">
                    Grupo de gastos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="account"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[150px_1fr] items-center">
                  <FormLabel>Conta</FormLabel>
                  <FormControl>
                    <Input placeholder="Carteira" {...field} />
                  </FormControl>
                  <FormDescription className="col-span-2 text-right">
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
                <FormItem className="grid grid-cols-[150px_1fr] items-center">
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="100,00" {...field} />
                  </FormControl>
                  <FormDescription className="col-span-2 text-right">
                    Informe o valor da sua transação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
