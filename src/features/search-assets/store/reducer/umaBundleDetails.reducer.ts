import { Action } from "redux";

import {
    umaBundleDetailsActionGroup,
    umaBundleDetailsLoadingAction,
    umaBundleDetailsLoadedOkAction,
    umaBundleDetailsLoadedErrorAction
} from "../actions";
import { UmaBundle } from "features/search-assets/services";
import { AppState } from "app-state";

export interface UmaBundleDetailsState {
    loading: boolean;
    error?: string;
    data?: UmaBundle;
}

export const umaBundleDetailsReducer = umaBundleDetailsActionGroup.hashedReducer(
    (props) => umaBundleHashKeySelector(props.stage, props.id),
    (state: UmaBundleDetailsState | undefined, action: Action): UmaBundleDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (umaBundleDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (umaBundleDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (umaBundleDetailsLoadedOkAction.is(action)) {
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

export const umaBundlDetailsPageSlector =
    (stage: string, id: number) =>
    (appState: AppState): UmaBundleDetailsState => {
        const umaBundleDetailsPage = appState.umaBundleDetails[umaBundleHashKeySelector(stage, id)];
        return {
            data: umaBundleDetailsPage?.data,
            loading: umaBundleDetailsPage?.loading,
            error: umaBundleDetailsPage?.error
        };
    };

export function umaBundleHashKeySelector(stage: string, id: number | string): string {
    return `${stage}/${id}`;
}
