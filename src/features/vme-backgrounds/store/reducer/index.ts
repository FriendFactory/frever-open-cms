import { combineReducers } from "redux";

import { vmeBackgroundEntitiesReducer } from "./vmeBackgroundEntitiesReducer";
import { vmeBackgroundListReducer } from "./vmeBackgroundListReducer";

import { backgroundAIEntitiesReducer } from "./BackgroundAI/backgroundAIEntitiesReducer";
import { backgroundAIListReducer } from "./BackgroundAI/backgroundAIListReducer";
import { backgroundAIMigrationReducer } from "./BackgroundAI/backgroundAIMigrationReducer";
import { backgroundAIPreviewReducer } from "./BackgroundAI/backgroundAIPreviewReducer";

export const vmeBackgroundReducer = combineReducers({
    entities: vmeBackgroundEntitiesReducer,
    list: vmeBackgroundListReducer
});

export const backgroundAIReducer = combineReducers({
    entities: backgroundAIEntitiesReducer,
    list: backgroundAIListReducer,
    migration: backgroundAIMigrationReducer,
    preview: backgroundAIPreviewReducer
});
