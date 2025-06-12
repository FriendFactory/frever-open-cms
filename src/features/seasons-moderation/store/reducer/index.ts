import { combineReducers } from "redux";

import { seasonListPageReducer } from "./seasonList.reducer";
import { seasonEntitiesReducer } from "./season.reducer";
import { seasonDetailsPageReducer } from "./seasonDetails.reducer";

export const seasonReducer = combineReducers({
    entities: seasonEntitiesReducer,
    listPages: seasonListPageReducer,
    detailsPages: seasonDetailsPageReducer
});
