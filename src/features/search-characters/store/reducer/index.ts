import { combineReducers } from "redux";

import { characterEntitiesReducer } from "./character.reducer";
import { characterDetailsReducer } from "./characterDetails.reducer";
import { characterListReducer } from "./characterList.reducer";
import { characterBakedViewReducer } from "./characterBakedView";

export const characterReducer = combineReducers({
    entities: characterEntitiesReducer,
    listPages: characterListReducer,
    detailsPages: characterDetailsReducer,
    backedView: characterBakedViewReducer
});

export * from "./characterList.reducer";
export * from "./characterDetails.reducer";
export * from "./character.reducer";
