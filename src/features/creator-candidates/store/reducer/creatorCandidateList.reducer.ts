import { AppState } from "app-state";
import qs from "query-string";
import { Action } from "redux";

import { CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { calculateListTotal } from "shared/calculate-list-total";
import { CreatorCandidatesQueryParams, StarCreatorCandidate } from "../../services";
import {
    creatorCandidateListActionGroup,
    creatorCandidateListLoadingAction,
    creatorCandidateListLoadedOkAction,
    creatorCandidateListLoadedErrorAction
} from "../actions";
import { creatorCandidateKeySelector } from "./creatorCandidateEntities";

export interface CreatorCandidateListState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const creatorCandidateListReducer = creatorCandidateListActionGroup.hashedReducer(
    (e) => creatorCandidateListPageHashKeySelector(e.stage, e.params),
    (state: CreatorCandidateListState | undefined, action: Action): CreatorCandidateListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (creatorCandidateListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (creatorCandidateListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (creatorCandidateListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.map((el) =>
                        creatorCandidateKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface CreatorCandidateListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: StarCreatorCandidate[];
    stage: string;
    params: CreatorCandidatesQueryParams;
}

export function creatorCandidateListPageSelector(
    stage: string,
    params: CreatorCandidatesQueryParams
): (appState: AppState) => CreatorCandidateListPageResult {
    return (appState) => {
        const state: CreatorCandidateListState =
            appState.creatorCandidate.listPages[creatorCandidateListPageHashKeySelector(stage, params)];

        const page = state?.pages?.[pageKeySelector(params.skip)];
        const data = page?.map((el) => appState.creatorCandidate.entities[el]!).filter(Boolean);
        const currentPage = Math.floor((params.skip ?? 0) / CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE) + 1;
        const pageSize = Number(params?.take ?? CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE);

        return {
            loading: state?.loading ?? false,
            data,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, pageSize),
            stage,
            error: state?.error,
            pageSize,
            currentPage
        };
    };
}

const creatorCandidateListPageHashKeySelector = (
    stage: string,
    { skip, ...params }: CreatorCandidatesQueryParams = {}
) => `${stage}/start-creator-candidate/${qs.stringify(params)}`;

const pageKeySelector = (skip?: number) => `skip = ${skip ?? 0}`;
