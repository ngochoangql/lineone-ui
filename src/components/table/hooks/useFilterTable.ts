import {useState} from "react";
import type {ColumnFiltersState} from "@tanstack/react-table";


export const useFilterTable = () => {
    const [globalFilter, setGlobalFilter] = useState<any>("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const getValueColumn = (id: string): string => {
        return columnFilters.find((col) => col.id === id)?.value as string ?? '';
    }
    const onChangeColumn = (id: string, value: string) => {
        if (value === '') {
            setColumnFilters(columnFilters.filter((col) => col.id !== id))
        } else {
            const isCol = columnFilters.some((col) => col.id === id);
            if (isCol) {
                setColumnFilters(
                    columnFilters.map((col) => col.id === id ? ({...col, value}) : col)
                )
            } else {
                setColumnFilters([...columnFilters, {id, value}])
            }
        }
    }

    return {
        getValueColumn,
        onChangeColumn,
        columnFilter: {
            columnFilters,
            onColumnFiltersChange: setColumnFilters,
            isFiltered: true
        },
        globalFilter: {
            globalFilter,
            onGlobalFilterChange: setGlobalFilter,
            isFiltered: true
        },
    }
}
