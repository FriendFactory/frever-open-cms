import { combineReducers } from "redux";

import { botCommentEntitiesReducer } from "./botCommentEntitiesReducer";

import { botCommentListReducer } from "./botCommentListReducer";

export const botCommentsReducer = combineReducers({
    entities: botCommentEntitiesReducer,
    listPages: botCommentListReducer
});

export { botCommentListPageSelector } from "./botCommentListReducer";
