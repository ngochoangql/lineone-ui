import type {RowSelectionState} from "@tanstack/react-table";
import {useState} from "react";


export const useRowSelectionTable = () => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    return {
        rowSelection,
        onRowSelectionChange: setRowSelection,
        isRowSelection: true
    }
}
