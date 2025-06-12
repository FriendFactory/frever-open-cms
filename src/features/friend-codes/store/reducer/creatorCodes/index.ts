import { combineReducers } from "redux";

import { creatorCodesEntitiesReducer } from "./creatorCodesEntitiesReducer";
import { creatorCodesListPageReducer } from "./creatorCodesListPageReducer";

export const creatorCodesReducer = combineReducers({
    entities: creatorCodesEntitiesReducer,
    listPages: creatorCodesListPageReducer
});
