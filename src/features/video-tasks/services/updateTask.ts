import { Store } from "antd/lib/form/interface";

import { request } from "shared";
import { Task } from ".";

export async function updateTask(stage: string, id: number, data: Store): Promise<Task> {
    const response = await request(stage).assetmanager().patch(`api/task/${id}`, data);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
