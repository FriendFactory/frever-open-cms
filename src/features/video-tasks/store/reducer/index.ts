import { combineReducers } from "redux";

import { taskListPageReducer } from "./taskList.reducer";
import { taskEntitiesReducer } from "./task.reducer";
import { taskDetailsPageReducer } from "./taskDetails.reducer";

export const taskReducer = combineReducers({
    entities: taskEntitiesReducer,
    listPages: taskListPageReducer,
    detailsPages: taskDetailsPageReducer
});

export { taskListPageSelector } from "./taskList.reducer";
export { taskDetailsPageSelector } from "./taskDetails.reducer";
export { taskBattleRewardsReducer } from "./battleRewards.reducer";
