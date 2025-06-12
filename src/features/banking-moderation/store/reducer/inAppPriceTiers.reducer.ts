import { Action } from "redux";

import { InAppPriceTier } from "../../services";
import {
    inAppPriceTiersActionGroup,
    inAppPriceTiersLoadingAction,
    inAppPriceTiersLoadedOkAction,
    inAppPriceTiersLoadedErrorAction
} from "../actions";

export interface InAppPriceTiersState {
    loading: boolean;
    error?: string;
    total?: number;
    data?: InAppPriceTier[];
}

export const inAppPriceTiersReducer = inAppPriceTiersActionGroup.hashedReducer(
    (args) => args.stage,
    (state: InAppPriceTiersState | undefined, action: Action): InAppPriceTiersState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (inAppPriceTiersLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (inAppPriceTiersLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (inAppPriceTiersLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                data: action.result.data
            };
        }

        return state;
    }
);
