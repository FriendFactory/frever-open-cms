import { request } from "shared";
import { Group } from "./api";

export async function editGroup(stage: string, id: number, data: Partial<Group>): Promise<Group> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .patch(`api/group`, { id, ...data }, { headers: { "Content-Type": "application/json" } });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error("Error requesting to edit entity");
}
