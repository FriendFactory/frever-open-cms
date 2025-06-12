import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { GEO_CLUSTER_LIST_DEFAULT_SIZE } from "urls";
import { GeoCluster } from "./api";

export interface GeoClustersListQueryParams {
    skip?: number;
    take?: number;
    id?: number;
    title?: string;
    isActive?: "true" | "false";
    orderBy?: "id" | "title" | "priority";
    sortDirection?: "asc" | "desc";
}
export async function getGeoClustersList(
    stage: string,
    params: GeoClustersListQueryParams
): Promise<ResultWithCount<GeoCluster>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? GEO_CLUSTER_LIST_DEFAULT_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter: string[] = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.title) filter.push(`contains(tolower(title), tolower('${params.title}'))`);
    if (params.isActive) filter.push(`isActive eq ${params.isActive}`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<ResultWithCount<GeoCluster>>(`api/geo-cluster?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
