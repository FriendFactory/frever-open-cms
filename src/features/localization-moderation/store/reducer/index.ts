import { combineReducers } from "redux";

import { localizationEntitiesReducer } from "./localizationEntitiesReducer";
import { localizationListReducer } from "./localizationListReducer";

export const localizationReducer = combineReducers({
    entities: localizationEntitiesReducer,
    list: localizationListReducer
});
