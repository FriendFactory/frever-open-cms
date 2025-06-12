import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE } from "urls";
import { StarCreatorWelcomeMessage } from "./api";

export interface CreatorWelcomeMessagesQueryParams {
    skip?: number;
    groupId?: number;
}
export async function getCreatorWelcomeMessages(
    stage: string,
    params: CreatorWelcomeMessagesQueryParams
): Promise<ResultWithCount<StarCreatorWelcomeMessage>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $take: DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE,
        $orderBy: "groupId desc"
    };

    const response = await request(stage)
        .assetmanager()
        .get<ResultWithCount<StarCreatorWelcomeMessage>>(`api/creator-code/invitations?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
