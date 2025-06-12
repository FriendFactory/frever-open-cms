import { Action } from "redux";
import { multipleEditingAction, multipleEditingResponseAction, multipleEditingCleanStatus } from "../actions";

export interface MultipleEditingState {
    loading: boolean;
    error?: string;
    data?: boolean[];
}

export const multipleEditingReducer = (
    state: MultipleEditingState | undefined,
    action: Action
): MultipleEditingState => {
    if (!state) {
        state = {
            loading: false
        };
    }

    if (multipleEditingAction.is(action)) {
        return {
            ...state,
            loading: true,
            error: undefined
        };
    }

    if (multipleEditingResponseAction.is(action)) {
        return {
            ...state,
            loading: false,
            data: action.result
        };
    }

    if (multipleEditingCleanStatus.is(action)) {
        return {
            loading: false
        };
    }

    return state;
};
