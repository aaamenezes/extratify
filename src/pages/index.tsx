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
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Home() {
  const addTransactionSchema = z.object({
    description: z.string().min(3, {
      message: 'Descrição muito curta',
    }),
    price: z.string().min(1),
  });

  const addTransactionForm = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      description: '',
      price: '0',
    },
  });

  const handleSubmitAddTransaction = useCallback(
    (values: z.infer<typeof addTransactionSchema>) => {
      console.log(`values:`, values);
    },
    []
  );

  return (
    <Card className="max-w-screen-sm mx-auto">
      <CardHeader>
        <CardTitle>Extratify</CardTitle>
        <CardDescription>Adicionar lançamento</CardDescription>
      </CardHeader>
      <CardContent>
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
                  <FormDescription>
                    Descreva o que foi a sua transação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addTransactionForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="100,00" {...field} />
                  </FormControl>
                  <FormDescription>O valor da sua transação</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Adicionar</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <h2>footer</h2>
      </CardFooter>
    </Card>
  );
}
