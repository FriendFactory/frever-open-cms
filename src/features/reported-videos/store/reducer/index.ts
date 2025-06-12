import { combineReducers } from "redux";

import { reportedVideoListReducer } from "./reportedVideoListReducer";
import { reportedVideoEntitiesReducer } from "./reportedVideoEntitiesReducer";

export const reportedVideoReducer = combineReducers({
    entities: reportedVideoEntitiesReducer,
    list: reportedVideoListReducer
});
