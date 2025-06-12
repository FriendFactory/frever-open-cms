import { request } from "shared";

export interface LinkedFreverofficialGroup {
    groupId: number;
    freverOfficialGroupId: number;
}

export async function getLinkedFreverofficialGroupList(stage: string): Promise<LinkedFreverofficialGroup[]> {
    const response = await request(stage).assetmanager().get(`api/chat/moderation/frever-official/access`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error("Error requesting to get LinkedFreverofficialGroupList");
}
