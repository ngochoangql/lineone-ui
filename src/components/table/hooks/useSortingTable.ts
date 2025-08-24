import {useState} from "react";
import type {SortingState} from "@tanstack/react-table";


export const useSortingTable = () => {
    const [sorting, setSorting] = useState<SortingState>([])

    return {
        sorting,
        onSortingChange: setSorting,
        isSorted: true
    }
}
