import { combineReducers } from "redux";

import { crewEntitiesReducer, getCrewKeyStageId } from "./crewEntitiesReducer";
import { crewListReducer } from "./crewListReducer";
import { AppState } from "app-state";

export const crewReducer = combineReducers({
    entities: crewEntitiesReducer,
    listPages: crewListReducer
});

export { crewListPageSelector } from "./crewListReducer";

export const crewMembersByChatId = (stage: string, chatId: number) => (appState: AppState) => {
    const result = Object.entries(appState.crews.entities).find(
        ([key, crew]) => getCrewKeyStageId(key) == stage && crew?.chatId == chatId
    );

    return result?.[1]?.members ?? [];
};
