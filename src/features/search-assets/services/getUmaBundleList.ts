import * as qs from "query-string";

import { request } from "shared";
import { UmaBundle } from ".";
import { DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE } from "urls";

export const umaBundleTypes = {
    version: 1,
    base: 2
};

export interface UmaBudnleListQueryParams {
    id?: number;
    name?: string;
    skip?: number;
    umaBundleTypeId?: number;
    orderBy?: "assetBundleName" | "id";
    sortDirection?: "asc" | "desc";
    readinessFilter?: string;
    bundleTypeFilter?: string;
    searchFilter?: "contains" | "eq" | "startswith" | "endswith";
}

interface UmaBudnleListParams {
    stage: string;
    params: UmaBudnleListQueryParams;
    expand?: Array<keyof UmaBundle>;
    select?: Array<keyof UmaBundle>;
}

export async function getUmaBundleList({ stage, params, expand, select }: UmaBudnleListParams): Promise<UmaBundle[]> {
    if (!stage) throw new Error("Stage is required");

    const filter = [];
    if (params.umaBundleTypeId) filter.push(`umaBundleTypeId eq ${params.umaBundleTypeId}`);
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.readinessFilter) filter.push(`readinessId in (${params.readinessFilter})`);
    if (params.bundleTypeFilter) filter.push(`umaBundleTypeId in (${params.bundleTypeFilter})`);
    if (params.name) {
        params.searchFilter === "eq"
            ? filter.push(`toupper(assetBundleName) eq toupper('${params.name}')`)
            : filter.push(`${params.searchFilter ?? "contains"}(toupper(assetBundleName), toupper('${params.name}'))`);
    }

    const query: any = {};
    if (params.skip) query.$skip = params.skip ?? 0;
    if (filter.length) query.$filter = filter.join(" and ");
    if (select) query.$select = select?.toString();
    if (expand) query.$expand = expand?.toString();

    query.$top = DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE;
    query.$count = true;
    query.$orderby = `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`;

    const response = await request(stage)
        .assetmanager()
        .get(`api/UmaBundle?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}

