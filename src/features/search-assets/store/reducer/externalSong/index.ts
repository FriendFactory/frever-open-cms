import { combineReducers } from "redux";

import { externalSongEntitiesReducer } from "./externalSong.reducer";
import { externalSongDetailsReducer } from "./externalSongDetails.reducer";
import { externalSongListReducer } from "./externalSongList.reducer";

export const externalSongReducer = combineReducers({
    entities: externalSongEntitiesReducer,
    listPage: externalSongListReducer,
    details: externalSongDetailsReducer
});

export { externalSongListPageSelector } from "./externalSongList.reducer";
