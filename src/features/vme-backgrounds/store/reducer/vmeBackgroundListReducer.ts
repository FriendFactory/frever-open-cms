import { Action } from "redux";

import {
    vmeBackgroundListActionGroup,
    vmeBackgroundListLoadingAction,
    vmeBackgroundListLoadedOkAction,
    vmeBackgroundListLoadedErrorAction
} from "../actions/vmeBackgroundList";
import { VMEBackground, VMEBackgroundQueryParams } from "../../services";
import { vmeBackgroundKeySelector } from "./vmeBackgroundEntitiesReducer";
import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_VME_BACKGROUND_LIST_SIZE } from "urls";
import { calculateListTotal } from "shared/calculate-list-total";

export interface VMEBackgroundState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: string[];
    };
}

export const vmeBackgroundListReducer = vmeBackgroundListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: VMEBackgroundState | undefined, action: Action): VMEBackgroundState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (vmeBackgroundListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (vmeBackgroundListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (vmeBackgroundListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.data.map((el) =>
                        vmeBackgroundKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);
export interface VMEBackgroundListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: VMEBackground[];
}

export function vmeBackgroundListSelector(
    stage: string,
    params: VMEBackgroundQueryParams
): (appState: AppState) => VMEBackgroundListPageResult {
    return (appState) => {
        const state = appState.vmeBackground.list[hashKeySelector(stage, params)];
        const page = state?.pages?.[pageKeySelector(params.skip)];

        const data = page?.map((el) => appState.vmeBackground.entities[el]!).filter(Boolean);

        const pageSize = Number(params?.take ?? DEFAULT_VME_BACKGROUND_LIST_SIZE);

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data,
            pageSize,
            currentPage,
            total: calculateListTotal(page?.length ?? 0, params.skip, pageSize)
        };
    };
}

export const vmeBackgroundInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = vmeBackgroundListSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};
