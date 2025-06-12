import { combineReducers } from "redux";

import { entitiesReducer } from "./entitiesReducer";
import { listReducer } from "./listReducer";

export const deviceBlacklistReducer = combineReducers({
    entities: entitiesReducer,
    list: listReducer
});

export { deviceBlacklistListSelector } from "./listReducer";
