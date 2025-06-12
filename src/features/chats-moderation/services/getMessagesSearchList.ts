import qs from "query-string";

import { request } from "shared";
import { ChatMessageSearch } from "./api";
import { CHAT_MESSAGES_SEARCH_SIZE } from "urls";

export interface ChatMessageSearchListQueryParams {
    take?: number;
    skip?: number;

    messageText?: string;
}

export async function getMessagesSearchList(
    stage: string,
    { skip, take, messageText }: ChatMessageSearchListQueryParams
): Promise<ChatMessageSearch[]> {
    const query = {
        skip: skip ?? 0,
        take: take ?? CHAT_MESSAGES_SEARCH_SIZE,
        filter: messageText ?? undefined
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/chat/moderation/message?` + qs.stringify(query));

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
