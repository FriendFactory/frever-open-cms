import { Action } from "redux";

import { AppState } from "app-state";
import { CREWS_LIST_BASE_PAGE_SIZE } from "urls";
import { hashKeySelector, pageKeySelector } from "utils";
import { crewKeySelector } from "./crewEntitiesReducer";
import { Crew, CrewListQueryParams } from "../../../services";
import {
    crewsListActionGroup,
    crewsListLoadingAction,
    crewsListLoadedOkAction,
    crewsListLoadedErrorAction
} from "../../actions";

export interface CrewsListState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const crewListReducer = crewsListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: CrewsListState | undefined, action: Action): CrewsListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (crewsListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (crewsListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (crewsListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip, action.params.take)]: action.result.data.map((el) =>
                        crewKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export const crewListPageSelector = (stage: string, params: CrewListQueryParams) => (appState: AppState) => {
    const result = appState.crews.listPages[hashKeySelector(stage, params)];

    const data = result?.pages?.[pageKeySelector(params.skip, params.take)]
        ?.map((el) => appState.crews?.entities[el]!)
        .filter(Boolean);

    const pageSize = params.take ?? CREWS_LIST_BASE_PAGE_SIZE;

    const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

    return {
        loading: result?.loading,
        error: result?.error,
        total: result?.total ?? 0,
        data,
        params,
        stage,
        pageSize,
        currentPage
    };
};

export interface CrewInfoResult {
    data?: Crew;
    error?: string;
    loading: boolean;
}

export const crewInfoByIdSelector =
    (stage: string, id: number) =>
    (appState: AppState): CrewInfoResult => {
        const info = crewListPageSelector(stage, { id })(appState);

        const [data] = info.data || [];

        return {
            loading: info.loading ?? false,
            error: info.error,
            data
        };
    };
