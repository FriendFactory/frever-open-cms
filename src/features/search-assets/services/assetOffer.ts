import { request } from "shared";

import { AssetOfferWithAssetInfo } from ".";

export const assetsAvailableForOffer = [
    "BodyAnimation",
    "VFX",
    "CameraFilter",
    "VoiceFilter",
    "SetLocation",
    "Wardrobe"
] as const;

export type AssetOfferType = (typeof assetsAvailableForOffer)[number];

export async function getAssetOfferByAssetId(
    stage: string,
    assetId: number,
    assetOfferType: AssetOfferType
): Promise<AssetOfferWithAssetInfo | null> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .get<AssetOfferWithAssetInfo | undefined>(`api/asset-offer/${assetId}/${assetOfferType}`);

    if (response.status === 200 || response.status === 204) {
        return response.data || null;
    }

    throw new Error(`Status code: ${response.status}.`);
}

export async function deactivateAssetOffer(stage: string, assetOfferId: number): Promise<null> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .put<AssetOfferWithAssetInfo>(`api/asset-offer/deactivate/${assetOfferId}`);

    if (response.status === 200 || response.status === 204) {
        return null;
    }

    throw new Error(`Status code: ${response.status}.`);
}

export interface CreateAssetOffer {
    assetId: number;
    assetType: string;
    title: string;
    description: string;
    softCurrencyPrice?: number;
    hardCurrencyPrice?: number;
}

export async function createAssetOffer(stage: string, data: CreateAssetOffer): Promise<null> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .post<AssetOfferWithAssetInfo>(`api/asset-offer`, data, { headers: { "Content-Type": "application/json" } });

    if (response.status === 200 || response.status === 204) {
        return null;
    }

    throw new Error(`Status code: ${response.status}.`);
}
