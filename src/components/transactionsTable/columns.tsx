import { ColumnDef } from '@tanstack/react-table';

export interface Transaction {
  description: string;
  value: string;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'description',
    header: 'Descrição',
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
