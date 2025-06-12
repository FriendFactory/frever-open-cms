import { combineReducers } from "redux";

import { entitiesReducer } from "./entitiesReducer";
import { listReducer } from "./listReducer";

export const spawnFormationReducer = combineReducers({
    entities: entitiesReducer,
    list: listReducer
});

export { spawnFormationListSelector } from "./listReducer";
