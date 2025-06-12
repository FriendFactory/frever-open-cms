import { request } from "shared";

export interface InitChatConversationData {
    freverOfficialGroupId: number;
    groupId: number;
}

export const initChatConversation = async (stage: string, data: InitChatConversationData): Promise<number> => {
    const response = await request(stage).assetmanager().post(`api/chat/moderation/frever-official`, data);

    if (response.status === 200 || response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}.`);
};
