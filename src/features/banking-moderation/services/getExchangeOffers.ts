import qs from "query-string";

import { request, ResultWithCount } from "shared";
import { ExchangeOffer } from ".";
import { EXCHANGE_OFFERS_BASE_PAGE_SIZE } from "urls";

export interface ExchangeOfferQueryParams {
    take?: number;
    skip?: number;
    orderBy?: "id" | "title" | "hardCurrencyRequired" | "softCurrencyGiven" | "sortOrder";
    sortDirection?: "asc" | "desc";

    id?: number;
    title?: string;
    isEnabled?: "true" | "false";
    hardCurrencyRequired?: number;
    softCurrencyGiven?: number;
    sortOrder?: number;
}

export const getExchangeOffers = async (
    stage: string,
    params: ExchangeOfferQueryParams
): Promise<ResultWithCount<ExchangeOffer>> => {
    const { take, skip, orderBy, sortDirection, ...restParams } = params;

    const filter = Object.entries(restParams)
        .map(([key, value]) => {
            if (!value) return;
            if (key === "title") return `startswith(tolower(${key}), tolower('${value}'))`;
            return `${key} eq ${value}`;
        })
        ?.filter(Boolean);

    const query: any = {
        $take: take ?? EXCHANGE_OFFERS_BASE_PAGE_SIZE,
        $skip: skip ?? 0,
        $orderBy: `${orderBy ?? "id"} ${sortDirection ?? "desc"}`
    };

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/in-app-purchase/exchange-offers?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code ${response.status}. ${response.statusText}`);
};
