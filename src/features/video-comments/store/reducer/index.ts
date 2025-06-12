import { combineReducers } from "redux";
import { commentsEntitiesReducer } from "./entitiesReducer";
import { videoCommentListPageReducer } from "./videoCommentListPageReducer";

export const videoCommentsReducer = combineReducers({
    entities: commentsEntitiesReducer,
    listPages: videoCommentListPageReducer
});

export { videoCommentsPageSelector } from "./videoCommentListPageReducer";
