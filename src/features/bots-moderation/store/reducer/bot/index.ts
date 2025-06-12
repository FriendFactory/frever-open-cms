import { combineReducers } from "redux";

import { botEntitiesReducer } from "./botEntitiesReducer";
import { botInfoReducer } from "./botInfoReducer";
import { botListReducer } from "./botListReducer";

export const botsReducer = combineReducers({
    entities: botEntitiesReducer,
    listPages: botListReducer,
    infoPage: botInfoReducer
});

export * from "./botEntitiesReducer";
export * from "./botListReducer";
export * from "./botInfoReducer";
