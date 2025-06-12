import qs from "qs";

import { Localization } from "./api";
import { BaseQueryParams, request, ResultWithCount } from "shared";
import { DEFAULT_LOCALIZATION_PAGE_SIZE } from "urls";

export interface LocalizationQueryParams extends BaseQueryParams {
    key?: string;
    type?: string;
    description?: string;

    isoCode?: string;
    value?: string;
}

export const getLocalizationList = async (
    stage: string,
    params: LocalizationQueryParams
): Promise<ResultWithCount<Localization>> => {
    let query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_LOCALIZATION_PAGE_SIZE,
        isoCode: params.isoCode ?? undefined,
        value: params.value ?? undefined
    };

    const filter: string[] = [];

    if (params.key) filter.push(`contains(tolower(key), tolower('${params.key}'))`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/localization/moderation?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
