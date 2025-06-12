import { combineReducers } from "redux";

import { listReducer } from "./listReducer";
import { entitiesReducer } from "./entitiesReducer";

export const watermarkReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});

export { watermarkListPageSelector, watermarkInfoByIdSelector, WatermarkPageSelectorType } from "./listReducer";
