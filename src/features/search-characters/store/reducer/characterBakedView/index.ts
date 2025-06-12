import { combineReducers } from "redux";

import { entitiesReducer } from "./entitiesReducer";
import { listReducer } from "./listReducer";

export const characterBakedViewReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});
