import { request, ThumbnailFile } from "shared";

export interface SendMessageData {
    text: string;
    videoId?: number;
    replyToMessageId?: number;
    files?: ThumbnailFile[];
}

export const sendMessage = async (stage: string, chatId: number, data: SendMessageData): Promise<undefined> => {
    const response = await request(stage)
        .assetmanager()
        .post(`api/chat/moderation/frever-official/${chatId}/message`, data);
    if (response.status === 200 || response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}.`);
};
