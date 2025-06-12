import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE } from "urls";
import { StarCreatorCode } from "./api";

export interface CreatorCodesQueryParams {
    skip?: number;
    groupId?: number;
}
export async function getCreatorCodes(
    stage: string,
    params: CreatorCodesQueryParams
): Promise<ResultWithCount<StarCreatorCode>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $take: DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE,
        $orderBy: "id desc"
    };

    const response = await request(stage)
        .assetmanager()
        .get<ResultWithCount<StarCreatorCode>>(`api/creator-code?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
