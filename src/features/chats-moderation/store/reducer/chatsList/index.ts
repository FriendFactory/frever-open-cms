import { combineReducers } from "redux";

import { chatsEntitiesReducer } from "./entitiesReducer";
import { chatsListReducer } from "./listReducer";

export const chatListReducer = combineReducers({
    entities: chatsEntitiesReducer,
    listPages: chatsListReducer
});

export { chatInfoKeySelector } from "./entitiesReducer";
