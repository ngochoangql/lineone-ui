import {useState} from "react";
import type {RowPinningState} from "@tanstack/react-table";

export const useRowPinningTable = (initialState?: RowPinningState) => {
    const [rowPinning, setRowPinning] = useState<RowPinningState>({
        top: [],
        bottom: [],
        ...initialState
    });

    const pinTop = (rowId: string) => {
        setRowPinning((prev) => ({
            ...prev,
            top: prev.top?.includes(rowId) ? prev.top : [...(prev.top || []), rowId],
            bottom: prev.bottom?.filter((id) => id !== rowId)
        }));
    };

    const pinBottom = (rowId: string) => {
        setRowPinning((prev) => ({
            ...prev,
            bottom: prev.bottom?.includes(rowId) ? prev.bottom : [...(prev.bottom || []), rowId],
            top: prev.top?.filter((id) => id !== rowId)
        }));
    };

    const unpin = (rowId: string) => {
        setRowPinning((prev) => ({
            ...prev,
            top: prev.top?.filter((id) => id !== rowId),
            bottom: prev.bottom?.filter((id) => id !== rowId)
        }));
    };

    const togglePinTop = (rowId: string) => {
        if (rowPinning.top?.includes(rowId)) {
            unpin(rowId)
        } else {
            pinTop(rowId);
        }
    };

    const togglePinBottom = (rowId: string) => {
        if (rowPinning.bottom?.includes(rowId)) {
            unpin(rowId)
        } else {
            pinBottom(rowId);
        }
    };

    return {
        rowPinning: {
            rowPinning,
            onRowPinningChange: setRowPinning,
            isRowPinning: true
        },
        pinTop,
        pinBottom,
        unpin,
        togglePinTop,
        togglePinBottom
    };
};
