import qs from "query-string";

import { request, ResultWithCount } from "shared";
import { dateToODataFormat } from "utils";
import { IN_APP_PRODUCTS_BASE_PAGE_SIZE } from "urls";
import { InAppProduct } from "./api";

export interface InAppProductsQueryParams {
    skip?: number;
    take?: number;

    id?: number;
    title?: string;
    publicationDate?: string;
    depublicationDate?: string;

    orderBy?: "id" | "title" | "publicationDate" | "depublicationDate" | "sortOrder";
    sortDirection?: "asc" | "desc";
}

export const getInAppProducts = async (
    stage: string,
    params: InAppProductsQueryParams
): Promise<ResultWithCount<InAppProduct>> => {
    const filter = [];
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.title) filter.push(`contains(tolower(title), tolower('${params.title}'))`);

    if (params.publicationDate) {
        const dates = dateToODataFormat(params.publicationDate);
        if (dates) filter.push(`publicationDate ge ${dates.start} and publicationDate le ${dates.end}`);
    }

    if (params.depublicationDate) {
        const dates = dateToODataFormat(params.depublicationDate);
        if (dates) filter.push(`depublicationDate ge ${dates.start} and depublicationDate le ${dates.end}`);
    }

    const query = {
        $skip: params.skip ?? 0,
        $top: params.take ?? IN_APP_PRODUCTS_BASE_PAGE_SIZE,
        $orderBy: `${params.orderBy || "id"} ${params.sortDirection || "desc"}`,
        $filter: filter.length ? filter.join(" and ") : undefined
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/in-app-purchase/products?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
