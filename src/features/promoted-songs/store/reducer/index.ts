import { combineReducers } from "redux";
import { promotedSongListPageReducer } from "./promotedSongListPageReducer";
import { promotedSongEntitiesReducer } from "./promotedSongReducer";
import { songNamesReducer } from "./songNamesReducer";

export const promotedSongReducer = combineReducers({
    entities: promotedSongEntitiesReducer,
    listPages: promotedSongListPageReducer,
    songNames: songNamesReducer
});

export { promotedSongListPagerSelector } from "./promotedSongListPageReducer";
