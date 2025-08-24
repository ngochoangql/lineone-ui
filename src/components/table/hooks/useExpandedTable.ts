import {useState} from "react";
import type {ExpandedState} from "@tanstack/react-table";


export const useExpandedTable = () => {
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const toggleExpandedRow = (rowId: string) => {
        setExpanded({
            ...(expanded as Record<string, boolean>),
            [rowId]: !((expanded as Record<string, boolean>)[rowId] as boolean)
        })
    }

    return {
        expanded: {
            expanded,
            onExpandedChange: setExpanded,
            isExpanded: true,
        },
        toggleExpandedRow
    }
}
