import { combineReducers } from "redux";

import { charactersBakingEntitiesReducer } from "./charactersBakingEntitiesReducer";
import { charactersBakingDetailsReducer } from "./charactersBakingDetailsReducer";

export const charactersBakingReducer = combineReducers({
    entities: charactersBakingEntitiesReducer,
    details: charactersBakingDetailsReducer
});

export { charactersBakingDetailsPageSelector } from "./charactersBakingDetailsReducer";
