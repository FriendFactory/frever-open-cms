import { combineReducers } from "redux";
import { storageFileListPageReducer } from "./storageFileListPageReducer";
import { storageFileEntitiesReducer } from "./storageFileReducer";

export const storageFileReducer = combineReducers({
    entities: storageFileEntitiesReducer,
    listPages: storageFileListPageReducer
});
