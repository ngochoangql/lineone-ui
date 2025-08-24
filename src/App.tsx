import type { ColumnDef } from '@tanstack/react-table';
import { DndTable, RowDragHandleCell } from './components/table/dnd-table';
import { useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

function App() {
  const data: User[] = [
    { id: '1', name: 'Hoàn', email: 'hoan@example.com' },
    { id: '2', name: 'Lan', email: 'lan@example.com' },
    { id: '3', name: 'Minh', email: 'minh@example.com' },
  ];
  const [list, setList] = useState<User[]>(data);

  const columns: ColumnDef<User>[] = [
    {
      id: 'drag',
      cell: () => {
        return <RowDragHandleCell />;
      },
    },
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Tên',
      filterFn: 'includesString',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
  ];
  return <DndTable columns={columns} onDataChange={setList} data={list} />;
}

export default App;
