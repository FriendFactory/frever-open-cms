import { request } from "shared";

export type DeleteOperation = "delete" | "undelete";
export async function softDeleteUser(stage: string, operation: DeleteOperation, groupId: number): Promise<undefined> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    const response =
        operation === "delete"
            ? await request(stage).assetmanager().delete(`api/account/moderation/${groupId}/delete`)
            : await request(stage).assetmanager().put(`api/account/moderation/${groupId}/undelete`);

    if (response.status === 204) {
        return;
    }
    throw new Error(`Status code: ${response.status}.`);
}
