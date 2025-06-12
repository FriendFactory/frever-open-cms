import { combineReducers } from "redux";

import { messagesSearchEntitiesReducer } from "./entitiesReducer";
import { messagesSearchListReducer } from "./listReducer";

export const chatMessagesSearchListReducer = combineReducers({
    entities: messagesSearchEntitiesReducer,
    listPages: messagesSearchListReducer
});

export { messageSearchKeySelector } from "./entitiesReducer";
export { messagesSearchListPageSelector } from "./listReducer";
