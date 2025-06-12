import { combineReducers } from "redux";

import { scheduledMessageEntitiesReducer } from "./scheduledMessageEntitiesReducer";
import { scheduledMessageListReducer } from "./scheduledMessageListReducer";

export const scheduledMessageReducer = combineReducers({
    entities: scheduledMessageEntitiesReducer,
    listPages: scheduledMessageListReducer
});
