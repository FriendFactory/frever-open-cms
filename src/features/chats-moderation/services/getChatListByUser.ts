import { BaseQueryParams, request } from "shared";

export interface ChatListByUserQueryParams extends BaseQueryParams {}

export async function getChatListByUser(stage: string, groupId: number): Promise<undefined> {
    const response = await request(stage).assetmanager().get(`api/chat/moderation/${groupId}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
