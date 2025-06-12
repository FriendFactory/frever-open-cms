import { combineReducers } from "redux";

import { emotionsEntitiesReducer } from "./emotionsEntitiesReducer";
import { emotionsListReducer } from "./emotionsListReducer";

export const emotionsReducer = combineReducers({
    entities: emotionsEntitiesReducer,
    listPages: emotionsListReducer
});
