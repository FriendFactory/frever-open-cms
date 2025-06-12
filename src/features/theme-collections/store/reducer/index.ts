import { combineReducers } from "redux";

import { collectionEntitiesReducer } from "./collectionEntitiesReducer";
import { collectionListReducer } from "./collectionListReducer";

export const themeCollectionsReducer = combineReducers({
    entities: collectionEntitiesReducer,
    listPages: collectionListReducer
});
