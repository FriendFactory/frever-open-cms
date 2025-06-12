import { Action } from "redux";

import {
    crewRewardsListActionGroup,
    crewRewardsListLoadingAction,
    crewRewardsListLoadedOkAction,
    crewRewardsListLoadedErrorAction
} from "../../actions";
import { AppState } from "app-state";
import { DEFAULT_CREW_REWARDS_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { hashKeySelector, pageKeySelector } from "utils";
import { CrewRewards, CrewRewardsQueryParams } from "../../../services";
import { crewRewardsKeySelector } from "./crewRewardsEntitiesReducer";

export interface CrewRewardsListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const crewRewardsListReducer = crewRewardsListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: CrewRewardsListState | undefined, action: Action): CrewRewardsListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (crewRewardsListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (crewRewardsListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (crewRewardsListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        crewRewardsKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface CrewRewardsListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: CrewRewards[];
    total: number;
}

export function crewRewardsListSelector(
    stage: string,
    params: CrewRewardsQueryParams
): (appState: AppState) => CrewRewardsListPageResult {
    return (appState) => {
        const state = appState.crewRewards.list[hashKeySelector(stage, params)];

        const data = state?.pages?.[pageKeySelector(params.skip)]
            ?.map((el) => appState.crewRewards.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_CREW_REWARDS_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            total: state?.total ?? 0,
            data,
            currentPage,
            pageSize
        };
    };
}
