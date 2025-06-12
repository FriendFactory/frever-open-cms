import { request } from "shared";
import { User } from ".";

export async function editUser(stage: string, id: number, data: Partial<User>): Promise<User> {
    const response = await request(stage)
        .assetmanager()
        .patch(`api/user`, { id, ...data });

    if (response.status === 200) return response.data;

    throw new Error("Error requesting to edit entity");
}
