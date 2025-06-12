import { defineAction, defineActionGroup } from "rd-redux-utils";

import { AssetListParams, EmotionAsset, EmotionAssetName } from "features/search-assets/services";

export const emotionAssetListActionGroup = defineActionGroup<{
    stage: string;
    emotionId: string;
    params: AssetListParams;
}>("EMOTION ASSET LIST");

export const emotionAssetListLoadAction =
    emotionAssetListActionGroup.defineAction<{ loadOnly?: EmotionAssetName[] | null }>("LOAD");

export const emotionAssetListLoadingAction = emotionAssetListActionGroup.defineAction("LOADING");

export const emotionAssetListLoadedOkAction = (<T extends EmotionAssetName>() =>
    emotionAssetListActionGroup.defineAction<{
        result: { assetType: T; data: EmotionAsset<T>[] }[];
    }>("LOADED OK"))();

export const updateAssetEmotionsAction = defineAction<{
    stage: string;
    emotionId: string;
    params: AssetListParams;
    asset: EmotionAssetName;
    value: EmotionAsset;
}>("UPDATE ASSET EMOTIONS");
