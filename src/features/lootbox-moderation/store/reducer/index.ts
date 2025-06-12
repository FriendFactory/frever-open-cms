import { combineReducers } from "redux";

import { lootBoxEntitiesReducer } from "./lootBoxEntitiesReducer";
import { lootBoxListReducer } from "./lootBoxListReducer";

export const lootBoxReducer = combineReducers({
    entities: lootBoxEntitiesReducer,
    list: lootBoxListReducer
});
