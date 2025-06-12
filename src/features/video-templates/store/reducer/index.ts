import { combineReducers } from "redux";
import { templateEntitiesReducer } from "./templateEntitiesReducer";
import { templateDetailsReducer } from "./templateDetailsReducer";
import { templateListReducer } from "./templateListReducer";
import { templateSortingModeReducer } from "./templateSortingMode.reducer";

export * from "./templateListReducer";
export * from "./templateDetailsReducer";
export * from "./templateSortingMode.reducer";

export const templateReducer = combineReducers({
    entities: templateEntitiesReducer,
    details: templateDetailsReducer,
    list: templateListReducer,
    sortingMode: templateSortingModeReducer
});
