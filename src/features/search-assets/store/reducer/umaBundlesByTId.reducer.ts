import { Action } from "redux";

import { AppState } from "app-state";
import { UmaBundle } from "../../services";
import {
    umaBundlesByTIdActionGroup,
    umaBundlesByTIdLoadingAction,
    umaBundlesByTIdLoadedOkAction,
    umaBundlesByTIdLoadedErrorAction
} from "../actions";

export interface UmaBundlesByTIdState {
    loading: boolean;
    error?: string;
    data?: UmaBundle[];
}

export const umaBundlesByTIdReducer = umaBundlesByTIdActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.umaBundleTypeId),
    (state: UmaBundlesByTIdState | undefined, action: Action): UmaBundlesByTIdState => {
        if (!state) {
            state = {
                loading: false,
                data: []
            };
        }

        if (umaBundlesByTIdLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (umaBundlesByTIdLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (umaBundlesByTIdLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.result
            };
        }

        return state;
    }
);

export function umaBundlestByTypeIdSelector(
    stage: string,
    umaBundleTypeId: number
): (appState: AppState) => UmaBundlesByTIdState {
    return (appState) => {
        const state = appState.umaBundlesByTId[hashKeySelector(stage, umaBundleTypeId)];

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data: state?.data ?? []
        };
    };
}

function hashKeySelector(stage: string, umaBundleTypeId: number): string {
    return `${stage}/${umaBundleTypeId}`;
}
