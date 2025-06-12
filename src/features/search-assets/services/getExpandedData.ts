import { request } from "shared";

export interface ExpandDataParams {
    stage: string;
    assetType: string;
    ids: string[];
    expandData: string[];
}

export async function getExpandedData({ stage, assetType, ids, expandData }: ExpandDataParams): Promise<any> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!assetType) {
        throw new Error("AssetType is required");
    }

    const assetToResponse = ids
        .map((id) => `id eq ${id}`)
        .toString()
        .replace(",", " or ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/${assetType}?$expand=${expandData}&$filter=${assetToResponse}`);

    if (response.status === 200) {
        return response.data;
    }
    throw new Error(`Status code: ${response.status}.`);
}
