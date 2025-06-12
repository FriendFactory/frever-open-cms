import { combineReducers } from "redux";

import { onboardingQuestGroupReducer } from "./questGroup";
import { onboardingQuestReducer } from "./quest";
import { onboardingRewardReducer } from "./reward";
import { onboardingQuestTypeReducer } from "./questTypeReducer";

export const onboardingReducer = combineReducers({
    questGroup: onboardingQuestGroupReducer,
    quest: onboardingQuestReducer,
    reward: onboardingRewardReducer,
    questType: onboardingQuestTypeReducer
});
