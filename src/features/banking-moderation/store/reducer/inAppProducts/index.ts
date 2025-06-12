import { combineReducers } from "redux";

import { inAppProductEntitiesReducer } from "./inAppProductEntities.reducer";
import { inAppProductInfoReducer } from "./inAppProductInfo.reducer";
import { inAppProductListReducer } from "./inAppProductList.reducer";

export const inAppProductsReducer = combineReducers({
    entities: inAppProductEntitiesReducer,
    listPages: inAppProductListReducer,
    infoPage: inAppProductInfoReducer
});

export * from "./inAppProductEntities.reducer";
export * from "./inAppProductList.reducer";
export * from "./inAppProductInfo.reducer";
