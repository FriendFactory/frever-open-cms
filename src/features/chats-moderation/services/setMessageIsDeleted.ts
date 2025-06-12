import { request } from "shared";

export async function setMessageIsDeleted(stage: string, messageId: number, isDeleted: boolean): Promise<undefined> {
    const response = await request(stage)
        .assetmanager()
        .post(`api/chat/moderation/message/${messageId}/deleted/${isDeleted}`);

    if (response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
