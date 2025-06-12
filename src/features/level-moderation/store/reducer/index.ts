import { combineReducers } from "redux";

import { eventEntitiesReducer } from "./event.reducer";
import { eventDetailsReducer } from "./eventDetails.reducer";

import { levelEntitiesReducer } from "./level.reducer";
import { levelDetailsReducer } from "./levelDetails.reducer";
import { levelListReducer } from "./levelList.reducer";

export const eventReducer = combineReducers({
    entities: eventEntitiesReducer,
    detailsPage: eventDetailsReducer
});

export const levelReducer = combineReducers({
    entities: levelEntitiesReducer,
    listPage: levelListReducer,
    detailsPage: levelDetailsReducer
});
