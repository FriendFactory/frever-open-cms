import { combineReducers } from "redux";

import { crewRewardsEntitiesReducer } from "./crewRewardsEntitiesReducer";
import { crewRewardsListReducer } from "./crewRewardsListReducer";

export const crewRewardsReducer = combineReducers({
    entities: crewRewardsEntitiesReducer,
    list: crewRewardsListReducer
});
