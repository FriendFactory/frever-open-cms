import { combineReducers } from "redux";

import { entitiesReducer } from "./entitiesReducer";
import { listReducer } from "./listReducer";

export const createPageReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});

export { createPageListPageSelector, createPageInfoByIdSelector } from "./listReducer";
