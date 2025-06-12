import { combineReducers } from "redux";

import { questGroupEntitiesReducer } from "./questGroupEntitiesReducer";
import { questGroupListReducer } from "./questGroupListReducer";

export const onboardingQuestGroupReducer = combineReducers({
    entities: questGroupEntitiesReducer,
    list: questGroupListReducer
});
