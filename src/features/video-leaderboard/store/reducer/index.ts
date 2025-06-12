import { combineReducers } from "redux";

import { entitiesReducer } from "./entitiesReducer";
import { listReducer } from "./listReducer";

export const videoLeaderboardReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});

export { videoLeaderboardListPageSelector, VideoLeaderboardPageSelectorType } from "./listReducer";
