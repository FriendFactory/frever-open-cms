import qs from "query-string";

import { request } from "shared";
import { ChatInfo } from "./api";
import { CHAT_LIST_BASE_PAGE_SIZE } from "urls";

export interface ChatListQueryParams {
    take?: number;
    skip?: number;

    title?: string;
    members?: number | number[];

    isDeleted?: "true" | "false";
}

export async function getChatList(
    stage: string,
    { skip, take, title, members, isDeleted }: ChatListQueryParams
): Promise<ChatInfo[]> {
    const query = {
        skip: skip ?? 0,
        take: take ?? CHAT_LIST_BASE_PAGE_SIZE,
        title,
        isDeleted,
        groupIds: members
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/chat/moderation?` + qs.stringify(query));

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
