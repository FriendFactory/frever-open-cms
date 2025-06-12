import { ExtraDataName, request } from "shared";

export async function deleteEntity<T extends ExtraDataName | string>(stage: string, entityName: T, entityId: number) {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage).assetmanager().delete(`api/${entityName}/${entityId}`);

    if (response.status === 204) {
        return entityId;
    }

    throw new Error(`Status code: ${response.status}`);
}
