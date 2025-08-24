import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DraggableAttributes,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  createContext,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { flexRender, getCoreRowModel, type Row, useReactTable } from '@tanstack/react-table';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { type DataTableProps, type TableStyle, TableVariant } from '../types';
import { buildOptions } from '../utils';

interface DragContextProps {
  listeners?: SyntheticListenerMap;
  attributes: DraggableAttributes;
}

const DragContext = createContext<DragContextProps | undefined>(undefined);

const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDragContext must be used within a DragContext');
  }
  return context;
};

export const RowDragHandleCell = ({ icon }: { icon?: ReactNode }) => {
  const { attributes, listeners } = useDragContext();
  return (
    <button {...attributes} {...listeners} style={{ cursor: 'pointer' }}>
      {icon ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      )}
    </button>
  );
};

export function DraggableRow<TData>({ row, styles }: { row: Row<TData>; styles?: TableStyle }) {
  const { listeners, attributes, transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    backgroundColor: isDragging ? '#f0f8ff' : 'transparent',
    position: 'relative',
  };

  return (
    <DragContext value={{ listeners, attributes }}>
      <tr ref={setNodeRef} className={TableVariant({ row: styles })} style={style}>
        {row.getVisibleCells().map((cell, index) => (
          <td
            key={cell.id}
            className={TableVariant({
              cellFirst: index === 0 ? styles : undefined,
              cellLast: index === row.getVisibleCells().length - 1 ? styles : undefined,
              cellCenter:
                index !== 0 && index !== row.getVisibleCells().length - 1 ? styles : undefined,
            })}
            style={{ width: cell.column.getSize() }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    </DragContext>
  );
}

interface DndDataTableProps<TData, TValue> extends DataTableProps<TData, TValue> {
  onDataChange: Dispatch<SetStateAction<TData[]>>;
}

export function DndTable<TData extends { id: string }, TValue>({
  columns,
  data,
  styles = 'hover',
  onColumnIds,
  onDataChange,
  ...props
}: DndDataTableProps<TData, TValue>) {
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

  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      onDataChange((currentData: TData[]) => {
        const oldIndex = currentData.findIndex((d) => d.id === active.id);
        const newIndex = currentData.findIndex((d) => d.id === over.id);
        return arrayMove(currentData, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
                        index !== 0 && index !== headerGroup.headers.length - 1
                          ? styles
                          : undefined,
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
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows.map((row) => (
                <DraggableRow row={row} key={row.id} styles={styles} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}
