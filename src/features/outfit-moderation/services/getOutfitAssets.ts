import { WardrobeAsset } from "features/search-assets/services";
import { request } from "shared";

export async function getOutfitAssets(stage: string, wardrobesIds: number[]): Promise<WardrobeAsset[]> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const getAssetById = async (assetId: number) => {
        const response = await request(stage)
            .assetmanager()
            .get<WardrobeAsset[]>(
                `/api/wardrobe?$filter=id eq ${assetId} &$select=id,name,files,createdTime,modifiedTime, readinessId`
            );
        if (response.status === 200 && response.data.length === 1) {
            return response.data[0];
        }
        return;
    };

    const assetLits: Array<WardrobeAsset> = (await Promise.all(wardrobesIds.map(getAssetById))).filter(Boolean) as any;

    return assetLits;
}
