import qs from "qs";

import { request } from "shared";
import { ChatUnreadMessageFilter, InboxInfo } from "./api";
import { COMMUNITY_INBOX_CHAT_LIST_SIZE } from "urls";

export interface InboxListQueryParams {
    take?: number;
    skip?: number;
    title?: string;
    isDeleted?: "true" | "false";
    messageFilter?: ChatUnreadMessageFilter;
    openChatId?: number;
}

export async function getInboxList(stage: string, params: InboxListQueryParams): Promise<InboxInfo[]> {
    const query = {
        skip: params?.skip ?? 0,
        take: params?.take ?? COMMUNITY_INBOX_CHAT_LIST_SIZE,
        messageFilter: params?.messageFilter,
        title: params?.title,
        isDeleted: params?.isDeleted
    };
    const response = await request(stage)
        .assetmanager()
        .get(`api/chat/moderation/frever-official?` + qs.stringify(query));

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
