import { combineReducers } from "redux";

import { rewardEntitiesReducer } from "./rewardEntitiesReducer";
import { rewardListReducer } from "./rewardListReducer";

export const onboardingRewardReducer = combineReducers({
    entities: rewardEntitiesReducer,
    list: rewardListReducer
});
