import { request } from "shared";
import { ExtraDataName, ExtraDataTypes } from "./api";

export async function getExtraData<T extends ExtraDataName>(stage: string, dataName: T): Promise<ExtraDataTypes[T]> {
    let query = "&$orderBy=id desc";

    if (dataName === "UMAAdjustment") query += "&$expand=wardrobeSubCategoryAndUmaAdjustment";

    const response = await request(stage).assetmanager().get(`api/${dataName}?${query}`);

    if (response.status === 200) return "data" in response.data ? response.data.data : response.data;

    throw new Error(`Status code: ${response.status}.`);
}
