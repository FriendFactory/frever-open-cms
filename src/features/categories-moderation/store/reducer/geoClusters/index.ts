import { combineReducers } from "redux";

import { geoClustersEntitiesReducer } from "./geoClustersEntitiesReducer";
import { geoClustersListPageReducer } from "./geoClustersListPageReducer";
import { geoClustersDetailsPageReducer } from "./geoClustersDetailsPageReducer";

export const geoClustersReducer = combineReducers({
    entities: geoClustersEntitiesReducer,
    listPages: geoClustersListPageReducer,
    detailsPage: geoClustersDetailsPageReducer
});

export { geoClustersListPageSelector } from "./geoClustersListPageReducer";
