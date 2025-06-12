import { Action } from "redux";

import { setBaseBundleToLinkerAction, setVersionBundleToLinkerAction, clearLinkerAction } from "../actions";
import { UmaBundle } from "features/search-assets/services";

export interface UmaBundleLinkerReducer {
    base?: UmaBundle;
    version?: UmaBundle;
}

export const umaBundleLinkerReducer = (
    state: UmaBundleLinkerReducer | undefined,
    action: Action
): UmaBundleLinkerReducer => {
    if (!state) {
        state = {
            base: undefined,
            version: undefined
        };
    }

    if (setBaseBundleToLinkerAction.is(action)) {
        return {
            ...state,
            base: action.data
        };
    }

    if (setVersionBundleToLinkerAction.is(action)) {
        return {
            ...state,
            version: action.data
        };
    }

    if (clearLinkerAction.is(action)) {
        return { base: undefined, version: undefined };
    }

    return state;
};
