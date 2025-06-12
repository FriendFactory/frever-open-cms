import { combineReducers } from "redux";

import { questEntitiesReducer } from "./questEntitiesReducer";
import { questListReducer } from "./questListReducer";

export const onboardingQuestReducer = combineReducers({
    entities: questEntitiesReducer,
    list: questListReducer
});
