import type { TableOptions } from '../types';
import {
  type ColumnFiltersState,
  type ExpandedState,
  type FilterFn,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

export const buildOptions = (options: TableOptions) => {
  const state: {
    sorting?: SortingState;
    pagination?: PaginationState;
    columnFilters?: ColumnFiltersState;
    globalFilter?: any;
    columnVisibility?: VisibilityState;
    expanded?: ExpandedState;
    rowPinning?: RowPinningState;
    rowSelection?: RowSelectionState;
  } = {};

  const filterFn: Record<string, FilterFn<any>> = {};

  const result: Record<string, any> = {};

  if (options.isSorted) {
    result.getSortedRowModel = getSortedRowModel();
    result.onSortingChange = options.onSortingChange;
    state.sorting = options.sorting;
  }

  if (options.isFiltered) {
    result.getFilteredRowModel = getFilteredRowModel();

    if (options.onColumnFiltersChange) {
      result.onColumnFiltersChange = options.onColumnFiltersChange;
      state.columnFilters = options.columnFilters;
    }

    if (options.onGlobalFilterChange) {
      result.onGlobalFilterChange = options.onGlobalFilterChange;
      state.globalFilter = options.globalFilter;
    }
  }

  if (options.onColumnFiltersChange) {
    result.onColumnFiltersChange = options.onColumnFiltersChange;
  }

  if (options.isPaginated) {
    result.getPaginationRowModel = getPaginationRowModel();
    result.onPaginationChange = options.onPaginationChange;
    state.pagination = options.pagination;
  }

  if (options.isExpanded) {
    result.getExpandedRowModel = getExpandedRowModel();
    result.onExpandedChange = options.onExpandedChange;
    state.expanded = options.expanded;
  }

  if (options.isColumnVisibility) {
    result.onColumnVisibilityChange = options.onColumnVisibilityChange;
    state.columnVisibility = options.columnVisibility;
  }

  if (options.isRowPinning) {
    result.onRowPinningChange = options.onRowPinningChange;
    result.enableRowPinning = options.isRowPinning;
    state.rowPinning = options.rowPinning;
  }

  if (options.isRowSelection) {
    result.onRowSelectionChange = options.onRowSelectionChange;
    result.enableRowSelection = options.isRowSelection;
    state.rowSelection = options.rowSelection;
  }

  if (options.isFuzzy) {
    filterFn.fuzzy = fuzzyFilter();
  }

  if (Object.keys(state).length > 0) {
    result.state = state;
  }

  if (Object.keys(filterFn).length > 0) {
    result.filterFn = filterFn;
  }

  return result;
};

const fuzzyFilter = (): FilterFn<any> => {
  return (row, columnId, filterValue, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), filterValue);
    addMeta?.({ itemRank });
    return itemRank.passed;
  };
};
