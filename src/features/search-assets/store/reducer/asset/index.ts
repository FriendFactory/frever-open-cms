import { combineReducers } from "redux";

import { assetEntitiesReducer } from "./asset.reducer";
import { assetDetailsReducer } from "./assetDetails.reducer";
import { assetListReducer } from "./assetList.reducer";
import { emotionAssetListReducer } from "./emotionAssetListReducer";

export const assetReducer = combineReducers({
    entities: assetEntitiesReducer,
    listPage: assetListReducer,
    detailsPage: assetDetailsReducer,
    emotionsAssetList: emotionAssetListReducer
});

export * from "./asset.reducer";
export * from "./assetDetails.reducer";
export * from "./assetList.reducer";
