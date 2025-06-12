import { Action } from "redux";

import { hashKeySelector, pageKeySelector } from "utils";
import {
    questGroupListActionGroup,
    questGroupListLoadingAction,
    questGroupListLoadedOkAction,
    questGroupListLoadedErrorAction
} from "../../actions";
import { questGroupKeySelector } from "./questGroupEntitiesReducer";

export interface QuestGroupListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const questGroupListReducer = questGroupListActionGroup.hashedReducer(
    ({ stage, params }) => hashKeySelector(stage, params),
    (state: QuestGroupListState | undefined, action: Action): QuestGroupListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (questGroupListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (questGroupListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (questGroupListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        questGroupKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);
