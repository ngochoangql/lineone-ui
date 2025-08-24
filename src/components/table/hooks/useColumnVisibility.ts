import {useState} from "react";
import type {VisibilityState} from "@tanstack/react-table";

export const useColumnVisibility = () => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnIds, setColumnIds] = useState<string[]>([])
    const isVisibilityColumn = (id: string): boolean => {
        return columnVisibility[id] !== undefined ? columnVisibility[id] : true
    }

    const hideColumn = (id: string) => {
        setColumnVisibility((prev) => ({...prev, [id]: false}));
    };

    const showColumn = (id: string) => {
        setColumnVisibility((prev) => ({...prev, [id]: true}));
    };

    const toggleColumn = (id: string) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleAllColumn = (allColumnIds?: string[]) => {
        const allVisible = (allColumnIds ?? columnIds).every((id) => columnVisibility[id] !== false);

        if (allVisible) {
            const newState: VisibilityState = {};
            (allColumnIds ?? columnIds).forEach((id) => {
                newState[id] = false;
            });
            setColumnVisibility(newState);
        } else {
            const newState: VisibilityState = {};
            (allColumnIds ?? columnIds).forEach((id) => {
                newState[id] = true;
            });
            setColumnVisibility(newState);
        }
    };

    return {
        columnVisibility: {
            columnVisibility,
            onColumnVisibilityChange: setColumnVisibility,
            isColumnVisibility: true,
            onColumnIds: setColumnIds
        },
        isVisibilityColumn,
        hideColumn,
        showColumn,
        toggleColumn,
        toggleAllColumn,
    };
};
