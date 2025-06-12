import { combineReducers } from "redux";

import { userMediaFileEntitiesReducer } from "./userMediaFileEntitiesReducer";
import { userMediaFileDetailsReducer } from "./userMediaFileDetailsReducer";
import { userMediaFileListReducer } from "./userMediaFileListReducer";

export const userMediaFileReducer = combineReducers({
    entities: userMediaFileEntitiesReducer,
    detailsPages: userMediaFileDetailsReducer,
    listPages: userMediaFileListReducer
});

export { userMediaFileListPageSelector } from "./userMediaFileListReducer";
