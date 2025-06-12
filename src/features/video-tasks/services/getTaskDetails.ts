import { request } from "shared";
import { Task } from ".";

export async function getTaskDetails(stage: string, id: number): Promise<Task> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage).assetmanager().get(`api/task/${id}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
