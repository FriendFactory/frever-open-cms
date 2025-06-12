import qs from "qs";

import { request } from "shared";
import { COMMUNITY_CONVERSATION_CHAT_LIST_SIZE } from "urls";
import { ChatConversationMessage } from "./api";

export interface ChatConversationQueryParams {
    target?: number;
    takeOlder?: number;
    takeNewer?: string;

    hideVideoMessages?: boolean;
    unreadOnly?: boolean;
}

export async function getChatConversation(
    stage: string,
    chatId: number,
    params: ChatConversationQueryParams
): Promise<ChatConversationMessage[]> {
    const query = {
        target: params?.target ?? "",
        takeOlder: params?.takeOlder ?? COMMUNITY_CONVERSATION_CHAT_LIST_SIZE,
        takeNewer: params?.takeNewer ?? 0,

        hideVideoMessages: params?.hideVideoMessages || undefined
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/chat/moderation/frever-official/${chatId}/message?` + qs.stringify(query));

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
