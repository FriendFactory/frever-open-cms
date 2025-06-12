import { Action } from "redux";

import {
    questListActionGroup,
    questListLoadingAction,
    questListLoadedOkAction,
    questListLoadedErrorAction
} from "../../actions";
import { hashKeySelector, pageKeySelector } from "utils";
import { questKeySelector } from "./questEntitiesReducer";

export interface QuestListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const questListReducer = questListActionGroup.hashedReducer(
    ({ stage, params }) => hashKeySelector(stage, params),
    (state: QuestListState | undefined, action: Action): QuestListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (questListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (questListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (questListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        questKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);
