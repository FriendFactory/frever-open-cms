import { combineReducers } from "redux";

import { hashtagListPageReducer } from "./hashtagListPage.reducer";
import { hashtagsEntitiesReducer } from "./hashtags.reducer";

export const hashtagsReducer = combineReducers({
    entities: hashtagsEntitiesReducer,
    listPages: hashtagListPageReducer
});
