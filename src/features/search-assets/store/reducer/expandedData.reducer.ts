import { Action } from "redux";
import {
    expandedDataAction,
    expandedDataLoadedOkAction,
    expandedDataLoadedErrorAction,
    expandedDataCleanStatus
} from "../actions";

export interface ExpandedDataState {
    loading: boolean;
    error?: string;
    response?: [];
}

export const expandedDataReducer = (state: ExpandedDataState | undefined, action: Action): ExpandedDataState => {
    if (!state) {
        state = {
            loading: false
        };
    }

    if (expandedDataAction.is(action)) {
        return {
            ...state,
            loading: true,
            error: undefined
        };
    }

    if (expandedDataLoadedErrorAction.is(action)) {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }

    if (expandedDataLoadedOkAction.is(action)) {
        return {
            ...state,
            loading: false,
            error: undefined,
            response: action.result
        };
    }

    if (expandedDataCleanStatus.is(action)) {
        return {
            loading: false
        };
    }
    return state;
};
