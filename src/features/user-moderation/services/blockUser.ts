import { request } from "shared";

export type BlockOperation = "block" | "unblock";

export async function blockUser(stage: string, groupId: number, operation: BlockOperation): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/account/moderation/${groupId}/${operation}`);

    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}.`);
}
