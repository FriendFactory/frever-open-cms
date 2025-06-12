import { Action } from "redux";

import {
    rewardListActionGroup,
    rewardListLoadingAction,
    rewardListLoadedOkAction,
    rewardListLoadedErrorAction
} from "../../actions";
import { hashKeySelector, pageKeySelector } from "utils";
import { rewardKeySelector } from "./rewardEntitiesReducer";

export interface RewardListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const rewardListReducer = rewardListActionGroup.hashedReducer(
    ({ stage, params }) => hashKeySelector(stage, params),
    (state: RewardListState | undefined, action: Action): RewardListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (rewardListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (rewardListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (rewardListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        rewardKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);
