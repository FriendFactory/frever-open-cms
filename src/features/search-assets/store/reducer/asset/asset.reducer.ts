import { Action } from "redux";

import { assetDetailsLoadedOkAction, assetListLoadedOkAction, emotionAssetListLoadedOkAction } from "../../actions";
import { AssetData, AssetDataNames } from "features/search-assets/services";
import { taskAssetsLoadedOkAction } from "features/video-tasks/store/actions";
import { outfitDetailsLoadedOkAction } from "features/outfit-moderation";

export interface AssetEntityState<T extends AssetDataNames> {
    [key: string]: AssetData[T];
}

export const assetEntitiesReducer = (
    state: AssetEntityState<AssetDataNames> | undefined,
    action: Action
): AssetEntityState<AssetDataNames> => {
    if (!state) {
        state = {};
    }

    if (assetListLoadedOkAction.is(action)) {
        return { ...state, ...entitiesWithKey(action.result, action.asset, action.stage, state) };
    }

    if (assetDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [assetKeySelector(action.stage, action.asset, action.id)]: action.result
        };
    }

    if (emotionAssetListLoadedOkAction.is(action)) {
        const newAssets: AssetEntityState<AssetDataNames> = {};

        action.result.map((el) =>
            el.data.map((info) => {
                newAssets[assetKeySelector(action.stage, el.assetType, info.id)] = info;
            })
        );
        return { ...state, ...newAssets };
    }

    if (taskAssetsLoadedOkAction.is(action)) {
        const newAssets: AssetEntityState<AssetDataNames> = {};
        for (let assetType in action.assets) {
            action.assets[assetType].map((el) => {
                newAssets[assetKeySelector(action.stage, assetType as AssetDataNames, el.id)] = el;
            });
        }
        return { ...state, ...newAssets };
    }

    if (outfitDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            ...entitiesWithKey(
                action.result.outfitAndWardrobe.map((el) => el.wardrobe!).filter(Boolean),
                "Wardrobe",
                action.stage,
                state
            )
        };
    }

    return state;
};

export function entitiesWithKey(
    data: AssetData[AssetDataNames][],
    assetType: AssetDataNames,
    stage: string,
    currentState?: AssetEntityState<AssetDataNames>
): AssetEntityState<AssetDataNames> {
    return data.reduce((accumulator: { [key: string]: AssetData[AssetDataNames] }, asset) => {
        accumulator[assetKeySelector(stage, assetType, asset.id)] = {
            ...currentState?.[assetKeySelector(stage, assetType, asset.id)],
            ...asset
        };
        return accumulator;
    }, {});
}

export const assetKeySelector = (stage: string, asset: AssetDataNames, id: number): string =>
    `${stage}/${asset}/${id}`.toLowerCase();

export const extractAssetFromKey = (key: string) => {
    const regex = /\/([^/]+)\/\d+$/;
    const match = key.match(regex);

    return match?.[1] ?? "";
};
