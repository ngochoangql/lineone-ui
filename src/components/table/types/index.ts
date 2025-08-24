import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  RowPinningState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { cva } from 'class-variance-authority';

export type TableOptions = {
  isSorted?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  isFiltered?: boolean;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  globalFilter?: any;
  onGlobalFilterChange?: OnChangeFn<any>;
  isPaginated?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  isColumnVisibility?: boolean;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  isExpanded?: boolean;
  expanded?: ExpandedState;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  isRowPinning?: boolean;
  rowPinning?: RowPinningState;
  onRowPinningChange?: OnChangeFn<RowPinningState>;
  isRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  isFuzzy?: boolean;
};

export type TableStyle = 'basic' | 'bordered' | 'hover' | 'zebra';

export interface DataTableProps<TData, TValue> extends TableOptions {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onColumnIds?: (columnIds: string[]) => void;
  styles?: TableStyle;
}

export const TableVariant = cva('', {
  variants: {
    wrapper: {
      basic: ' min-w-full overflow-x-auto',
      bordered:
        'min-w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-navy-500',
      hover: ' min-w-full overflow-x-auto',
      zebra: ' min-w-full overflow-x-auto',
    },
    table: {
      basic: 'w-full text-left',
      bordered: 'w-full text-left',
      hover: 'is-hover w-full text-left',
      zebra: 'is-zebra w-full text-left',
    },
    header: {
      basic: 'border border-transparent border-b-slate-200 dark:border-b-navy-500',
      bordered: '',
      hover: '',
      zebra: '',
    },
    headerCellFirst: {
      basic:
        'whitespace-nowrap px-3 py-3 font-semibold uppercase text-slate-800 dark:text-navy-100 lg:px-5',
      bordered:
        'whitespace-nowrap border border-t-0 border-l-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5',
      hover:
        'whitespace-nowrap rounded-l-lg bg-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5',
      zebra:
        'whitespace-nowrap rounded-l-lg bg-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5',
    },
    headerCellCenter: {
      basic:
        'whitespace-nowrap px-3 py-3 font-semibold uppercase text-slate-800 dark:text-navy-100 lg:px-5',
      bordered:
        'whitespace-nowrap border border-t-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5',
      hover:
        'whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5',
      zebra:
        'whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5',
    },
    headerCellLast: {
      basic:
        'whitespace-nowrap px-3 py-3 font-semibold uppercase text-slate-800 dark:text-navy-100 lg:px-5',
      bordered:
        'whitespace-nowrap border border-t-0 border-r-0 border-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:border-navy-500 dark:text-navy-100 lg:px-5',
      hover:
        'whitespace-nowrap rounded-r-lg bg-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5',
      zebra:
        'whitespace-nowrap rounded-r-lg bg-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5',
    },
    cellFirst: {
      basic: 'whitespace-nowrap px-4 py-3 sm:px-5',
      bordered:
        'whitespace-nowrap border border-l-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5',
      hover: 'whitespace-nowrap rounded-l-lg px-4 py-3 sm:px-5',
      zebra: 'whitespace-nowrap rounded-l-lg px-4 py-3 sm:px-5',
    },
    cellCenter: {
      basic: 'whitespace-nowrap px-4 py-3 sm:px-5',
      bordered: 'whitespace-nowrap border border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5',
      hover: 'whitespace-nowrap px-4 py-3 sm:px-5',
      zebra: 'whitespace-nowrap px-4 py-3 sm:px-5',
    },
    cellLast: {
      basic: 'whitespace-nowrap px-4 py-3 sm:px-5',
      bordered:
        'whitespace-nowrap border border-r-0 border-slate-200 px-3 py-3 dark:border-navy-500 lg:px-5',
      hover: 'whitespace-nowrap rounded-r-lg px-4 py-3 sm:px-5',
      zebra: 'whitespace-nowrap rounded-r-lg px-4 py-3 sm:px-5',
    },
    row: {
      basic: 'border border-transparent border-b-slate-200 dark:border-b-navy-500',
      bordered: '',
      hover: 'border border-transparent border-b-slate-200 dark:border-b-navy-500',
      zebra: '',
    },
  },
});
