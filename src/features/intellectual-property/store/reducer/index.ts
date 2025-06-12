import { combineReducers } from "redux";

import { listReducer } from "./listReducer";
import { entitiesReducer } from "./entitiesReducer";

export const intellectualPropertyReducer = combineReducers({
    entities: entitiesReducer,
    listPages: listReducer
});

export {
    intellectualPropertyListPageSelector,
    intellectualPropertyInfoByIdSelector,
    IntellectualPropertyPageSelectorType
} from "./listReducer";
