import { Action } from "redux";

import { Localization } from "../../services";
import { localizationListLoadedOkAction } from "../actions/localizationList";

export interface LocalizationEntitiesState {
    [key: string]: Localization | undefined;
}

export const localizationEntitiesReducer = (
    state: LocalizationEntitiesState | undefined,
    action: Action
): LocalizationEntitiesState => {
    if (!state) {
        state = {};
    }

    if (localizationListLoadedOkAction.is(action)) {
        return action.data.reduce<LocalizationEntitiesState>(
            (acc, el) => {
                acc[localizationKeySelector(action.stage, el.key)] = el;
                return acc;
            },
            { ...state }
        );
    }

    return state;
};

export const localizationKeySelector = (stage: string, key: string) => `${stage}/localization/${key}`;
