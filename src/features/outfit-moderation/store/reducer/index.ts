import { combineReducers } from "redux";

import { outfitEntitiesReducer } from "./outfit.reducer";
import { outfitDetailsReducer } from "./outfitDetails.reducer";
import { outfitListReducer } from "./outfitList.reducer";

export const outfitReducer = combineReducers({
    entities: outfitEntitiesReducer,
    listPage: outfitListReducer,
    detailsPage: outfitDetailsReducer
});
