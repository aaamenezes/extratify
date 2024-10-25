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
    accessorKey: 'value',
    header: 'Valor',
  },
];
