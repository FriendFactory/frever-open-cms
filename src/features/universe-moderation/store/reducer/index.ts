import { combineReducers } from "redux";

import { listReducer } from "./listReducer";
import { entitiesReducer } from "./entitiesReducer";

export const universeReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});

export { universeListPageSelector, universeInfoByIdSelector, UniverPageSelectorType } from "./listReducer";
