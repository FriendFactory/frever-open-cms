import { request } from "shared";

export async function postLinkAdminUserToFreverOfficial(
    stage: string,
    groupId: number,
    freverOfficialGroupId: number
): Promise<any[]> {
    const response = await request(stage)
        .assetmanager()
        .post(`api/chat/moderation/frever-official/${groupId}/access/${freverOfficialGroupId}`);

    if (response.status === 204) {
        return response.data;
    }

    throw new Error("Error requesting to POST Link groupId to FreverofficialGroupId");
}
