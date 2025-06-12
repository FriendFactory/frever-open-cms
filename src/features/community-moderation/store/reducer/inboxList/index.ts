import { combineReducers } from "redux";

import { inboxEntitiesReducer } from "./entitiesReducer";
import { inboxListReducer } from "./listReducer";

export const communityInboxListReducer = combineReducers({
    entities: inboxEntitiesReducer,
    listPages: inboxListReducer
});

export { inboxInfoKeySelector } from "./entitiesReducer";
