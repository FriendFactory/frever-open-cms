import { combineReducers } from "redux";

import { videoEntitiesReducer } from "./videoEntitiesReducer";
import { videoModerationListReducer } from "./videoModerationListReducer";
import { videoModerationDetailsReducer } from "./videoModerationDetailsReducer";

export const videoModerationReducer = combineReducers({
    entities: videoEntitiesReducer,
    listPage: videoModerationListReducer,
    detailsPage: videoModerationDetailsReducer
});

export { videoDetailsSelector } from "./videoModerationDetailsReducer";
export { videoModerationListPageSelector } from "./videoModerationListReducer";
