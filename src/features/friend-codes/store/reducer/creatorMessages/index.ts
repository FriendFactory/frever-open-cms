import { combineReducers } from "redux";

import { creatorMessagesEntitiesReducer } from "./creatorMessagesEntitiesReducer";
import { creatorMessagesListPageReducer } from "./creatorMessagesListPageReducer";

export const creatorMessagesReducer = combineReducers({
    entities: creatorMessagesEntitiesReducer,
    listPages: creatorMessagesListPageReducer
});
