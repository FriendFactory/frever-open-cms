import { request } from "shared";

export interface LinkedFreverofficialByGroupIdData {
    id: number;
    nickName: number;
}

export async function getLinkedFreverofficialByGroupId(
    stage: string,
    groupId: number
): Promise<LinkedFreverofficialByGroupIdData[]> {
    const response = await request(stage).assetmanager().get(`api/chat/moderation/frever-official/access/${groupId}`);

    if (response.status === 200) return response.data;

    throw new Error("Error requesting to get LinkedFreverofficialByGroupId");
}
