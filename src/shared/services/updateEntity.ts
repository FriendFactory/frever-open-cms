import { request } from "shared";
import { AssetFormData, ExtraDataName, ExtraDataTypes } from "./api";

export async function updateEntity<T extends ExtraDataName>(
    stage: string,
    entityName: T | "UmaRecipe",
    data: AssetFormData
): Promise<ExtraDataTypes[T]> {
    const method = entityName === "Readiness" ? "put" : "patch";

    const response = await request(stage).assetmanager()[method](`api/${entityName}`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
