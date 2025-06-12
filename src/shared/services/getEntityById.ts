import { request } from "shared";

export async function getEntityById<T>(stage: string, entityName: string, id: string | number): Promise<T> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!entityName) {
        throw new Error("EntityName is required");
    }

    const response = await request(stage).assetmanager().get<T>(`api/${entityName}/${id}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
