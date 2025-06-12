import { combineReducers } from "redux";

import { listReducer } from "./listReducer";
import { entitiesReducer } from "./entitiesReducer";

export const raceReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});

export { raceListPageSelector, raceInfoByIdSelector, RaceListPageSelector } from "./listReducer";
