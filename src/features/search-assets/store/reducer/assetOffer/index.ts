import { combineReducers } from "redux";

import { assetOfferByAssetReducer } from "./assetOfferByAsset.reducer";
import { assetOfferEntitiesReducer } from "./assetOfferEntities.reducer";
import { assetOfferListReducer } from "./assetOfferList.reducer";

export const assetOfferReducer = combineReducers({
    entities: assetOfferEntitiesReducer,
    assetDetailsPage: assetOfferByAssetReducer,
    assetOfferList: assetOfferListReducer
});
