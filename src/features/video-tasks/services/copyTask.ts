import { request } from "shared";
import { Task } from "./api";

export const copyTask = async (stage: string, id: number): Promise<Task> => {
    const response = await request(stage).assetmanager().post(`api/Task/${id}/copy`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
};
