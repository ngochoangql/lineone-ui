import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Fragment, useEffect } from 'react';
import { type DataTableProps, TableVariant } from '../types';
import { buildOptions } from '../utils';

export function Table<
  TData extends {
    id?: string;
  },
  TValue,
>({ columns, data, onColumnIds, styles, ...props }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row, index) => row.id ?? index.toString(),
    getCoreRowModel: getCoreRowModel(),
    ...buildOptions(props),
  });

  useEffect(() => {
    onColumnIds?.(table.getAllLeafColumns().map((c) => c.id));
  }, []);

  return (
    <div className={TableVariant({ wrapper: styles })}>
      <table className={TableVariant({ table: styles })}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={TableVariant({ header: styles })}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={TableVariant({
                    headerCellFirst: index === 0 ? styles : undefined,
                    headerCellLast: index === headerGroup.headers.length - 1 ? styles : undefined,
                    headerCellCenter:
                      index !== 0 && index !== headerGroup.headers.length - 1 ? styles : undefined,
                  })}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr className={TableVariant({ row: styles })}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={TableVariant({
                      cellFirst: index === 0 ? styles : undefined,
                      cellLast: index === row.getVisibleCells().length - 1 ? styles : undefined,
                      cellCenter:
                        index !== 0 && index !== row.getVisibleCells().length - 1
                          ? styles
                          : undefined,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
