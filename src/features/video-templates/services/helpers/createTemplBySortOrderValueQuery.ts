import qs from "query-string";

import { SortOrderTypes } from "../api";

export interface TemplBySortOrderValueParams {
    categoryId?: number;
    sortOrderType: SortOrderTypes;
}

export function createTemplBySortOrderValueQuery(params: TemplBySortOrderValueParams, value: number) {
    const query: any = {};

    if (params.categoryId) {
        query.categoryId = params.categoryId;
    }

    query.$filter = `${params.sortOrderType} eq ${value}`;

    query.$top = 1;

    return qs.stringify(query);
}
