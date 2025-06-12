import qs from "query-string";

import { request } from "shared";
import { DEFAULT_PURCHASES_LIST_PAGE_SIZE } from "urls";
import { PurchasedAsset } from "./api";

export const PurchasedAssetsTypes = {
    BodyAnimations: "BodyAnimation",
    CameraFilters: "CameraFilter",
    SetLocations: "SetLocation",
    Vfxes: "VFX",
    Wardrobes: "Wardrobe"
} as const;

export type PurchasedAssetsTypesNames = keyof typeof PurchasedAssetsTypes;

export interface PurchasedAssetsQueryParams {
    groupId?: number;
    skip?: number;
    take?: number;

    assetType?: string[];
}

export async function getPurchasedAssets(
    stage: string,
    assetType: PurchasedAssetsTypesNames,
    params: PurchasedAssetsQueryParams
): Promise<PurchasedAsset[]> {
    if (!params.groupId) throw new Error("GroupId is required");

    const query = {
        groupId: params.groupId,
        skip: params.skip ?? 0,
        take: params.take ?? DEFAULT_PURCHASES_LIST_PAGE_SIZE
    };

    const response = await request(stage)
        .assetmanager()
        .get<PurchasedAsset[]>(`api/purchasedAssets/${assetType}?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data.map((el) => ({ ...el, assetType: PurchasedAssetsTypes[assetType] }));
    }

    if (response.status === 204) return [];

    throw new Error(`Status code: ${response.status}.`);
}
