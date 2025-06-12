import { Action } from "redux";

import { showAssetsDeleteModalAction, hideAssetsDeleteModalAction } from "../actions";
import { AssetTypes } from "config";
import { AssetData } from "features/search-assets/services";

export interface AssetsToDeleteModalReducer {
    assetToDeleteList: AssetData[AssetTypes][];
    deleteModalVisibility: boolean;
}

export const assetsToDeleteModalReducer = (
    state: AssetsToDeleteModalReducer | undefined,
    action: Action
): AssetsToDeleteModalReducer => {
    if (!state) {
        state = {
            assetToDeleteList: [],
            deleteModalVisibility: false
        };
    }

    if (showAssetsDeleteModalAction.is(action)) {
        return {
            assetToDeleteList: action.assetToDeleteList,
            deleteModalVisibility: true
        };
    }

    if (hideAssetsDeleteModalAction.is(action)) {
        return {
            assetToDeleteList: [],
            deleteModalVisibility: false
        };
    }

    return state;
};
