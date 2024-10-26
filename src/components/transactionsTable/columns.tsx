import { ColumnDef } from '@tanstack/react-table';

export interface Transaction {
  description: string;
  value: string;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'account',
    header: 'Conta',
  },
  {
    accessorKey: 'value',
    header: 'Valor',
  },
];
