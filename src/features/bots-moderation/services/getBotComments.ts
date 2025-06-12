import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE } from "urls";
import { BotComment } from "./api";

export interface BotCommentListQueryParams {
    skip?: number;
    take?: number;

    id?: string;
    commentText?: string;
    isEnabled?: "true" | "false";
}

export async function getBotComments(
    stage: string,
    params: BotCommentListQueryParams
): Promise<ResultWithCount<BotComment>> {
    const query: any = {
        $skip: params?.skip ?? 0,
        $top: params?.take ?? DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE,
        $orderBy: "id desc"
    };

    const filter: string[] = [];

    if (params.id) {
        const result = params.id
            .split(",")
            .filter((el) => !!el.trim() && !isNaN(Number(el)))
            .map((el) => `id eq ${el}`)
            .join(" or ");

        filter.push(`(${result})`);
    }

    if (params.commentText) filter.push(`contains(tolower(commentText), tolower('${params.commentText}'))`);

    if (params.isEnabled) filter.push(`isEnabled eq ${params.isEnabled}`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/bot/comment?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
