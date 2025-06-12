import { combineReducers } from "redux";

import { reportedMessageEntitiesReducer } from "./reportedMessageEntitiesReducer";
import { reportedMessageListReducer } from "./reportedMessageListReducer";

export const reportedMessagesReducer = combineReducers({
    entities: reportedMessageEntitiesReducer,
    list: reportedMessageListReducer
});

export { reportedMessageListSelector } from "./reportedMessageListReducer";
