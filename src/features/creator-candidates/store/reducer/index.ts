import { combineReducers } from "redux";

import { creatorCandidateEntitiesReducer } from "./creatorCandidateEntities";
import { creatorCandidateListReducer } from "./creatorCandidateList.reducer";

export const creatorCandidateReducer = combineReducers({
    entities: creatorCandidateEntitiesReducer,
    listPages: creatorCandidateListReducer
});

export { creatorCandidateListPageSelector } from "./creatorCandidateList.reducer";
