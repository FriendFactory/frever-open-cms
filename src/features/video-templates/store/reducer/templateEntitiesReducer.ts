import { Action } from "redux";

import { Template } from "../../services";

import {
    templateLoadedOkAction,
    templateListLoadedOkAction,
    templateSortingModeLoadedOkAction,
    templateSortingClearUpAction,
    deleteTemplatesFinishedOkAction
} from "../actions";

interface TemplateEntitiesState {
    [Key: string]: Template | undefined;
}

export const templateEntitiesReducer = (
    state: TemplateEntitiesState | undefined,
    action: Action
): TemplateEntitiesState => {
    if (!state) state = {};

    if (templateListLoadedOkAction.is(action)) {
        return action.result.data.reduce<TemplateEntitiesState>((acc, el) => {
            acc[templateKeySelector(action.stage, el.id)] = el;
            return acc;
        }, {});
    }

    if (templateLoadedOkAction.is(action)) {
        return {
            ...state,
            [templateKeySelector(action.stage, action.id)]: action.result
        };
    }

    if (templateSortingModeLoadedOkAction.is(action)) {
        return action.result.reduce<TemplateEntitiesState>(
            (acc, el) => {
                acc[templateKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (deleteTemplatesFinishedOkAction.is(action)) {
        return action.result.reduce(
            (acc, el) => {
                acc[templateKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (templateSortingClearUpAction.is(action)) {
        return {};
    }

    return state;
};

export const templateKeySelector = (stage: string, id: number) => `${stage}/template/${id}`;
