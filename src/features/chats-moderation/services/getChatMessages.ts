import { request } from "shared";
import { ChatMessage } from "./api";
import { CHAT_HISTORY_LIST_BASE_PAGE_SIZE } from "urls";
import qs from "qs";

export interface ChatQueryParams {
    target?: number;
    takeOlder?: number;
    takeNewer?: number;
}

export async function getChatMessages(
    stage: string,
    chatId: number,
    params: ChatQueryParams,
    useEmptyParams: boolean = false
): Promise<ChatMessage[]> {
    const query: any = useEmptyParams
        ? {
              ...(params.target !== undefined && { target: params.target }),
              ...(params.takeOlder !== undefined && { takeOlder: params.takeOlder }),
              ...(params.takeNewer !== undefined && { takeNewer: params.takeNewer })
          }
        : {
              target: params.target ?? "",
              takeOlder: params.takeOlder ?? CHAT_HISTORY_LIST_BASE_PAGE_SIZE,
              takeNewer: params.takeNewer ?? 0
          };

    const response = await request(stage)
        .assetmanager()
        .get(`api/chat/moderation/${chatId}/message?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
