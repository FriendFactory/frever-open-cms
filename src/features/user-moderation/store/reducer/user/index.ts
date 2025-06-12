import { combineReducers } from "redux";

import { userDetailsReducer } from "./userDetailsReducer";
import { userEntitiesReducer } from "./userEntitiesReducer";
import { userListReducer } from "./userListReducer";

export const userReducer = combineReducers({
    entities: userEntitiesReducer,
    listPage: userListReducer,
    detailsPage: userDetailsReducer
});
