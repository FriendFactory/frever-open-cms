import { request } from "shared";

export async function deleteScheduledMessage(stage: string, id: number): Promise<undefined> {
    const response = await request(stage).assetmanager().delete(`api/chat/moderation/scheduled-message/${id}`);

    if (response.status === 204) return;

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
