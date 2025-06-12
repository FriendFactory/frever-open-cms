import { combineReducers } from "redux";

import { playlistsEntitiesReducer } from "./entities.reducer";
import { playlistDetailsReducer } from "./playlistDetails.reducer";
import { playlistsStatusReducer } from "./playlistsStatus.reducer";

export const playlistsReducer = combineReducers({
    entities: playlistsEntitiesReducer,
    playlists: playlistsStatusReducer,
    details: playlistDetailsReducer
});
