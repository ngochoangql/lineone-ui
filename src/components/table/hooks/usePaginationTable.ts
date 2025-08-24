import {useState} from "react";


type UsePaginationTableType = {
    pageIndex: number;
    pageSize: number;
}

export const usePaginationTable = ({pageIndex, pageSize} : UsePaginationTableType) => {
    const [pagination, setPagination] = useState({
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 10,
    });

    return {
        pagination,
        onPaginationChange: setPagination,
        isPaginated: true,
    }
}
