import qs from "query-string";

import { SortOrderTypes } from "../api";

export interface SortOrderModeParams {
    skip?: number;
    categoryId?: number;
    byUsageCount?: true | false;
}

export function createTemplateSortingModeQuery(sortOrderType: SortOrderTypes, params: SortOrderModeParams) {
    const query: any = {};

    if (params.categoryId) {
        query.categoryId = params.categoryId;
    }

    if (params.skip) {
        query.$skip = params.skip;
    }

    if (!params.byUsageCount) {
        query.$filter = `${sortOrderType} ne null`;
        query.$orderBy = `${sortOrderType} asc`;
    } else {
        query.$filter = `${sortOrderType} eq null`;
        query.$orderBy = `usageCount desc`;
    }

    query.$top = 500;

    return qs.stringify(query);
}
