import { request } from "shared";

export async function hardDeleteUser(stage: string, groupId: number): Promise<string> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    const response = await request(stage)
        .assetmanager()
        .delete(`/api/account/moderation/${groupId}/hard-delete`, {
            headers: {
                "x-request-id": ""
            }
        });

    if (response.status === 204) {
        return `x-request-id: ${response.headers["x-request-id"]}`;
    }
    throw new Error(`Status code: ${response.status}.`);
}
