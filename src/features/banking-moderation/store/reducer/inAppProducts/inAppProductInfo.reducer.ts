import { Action } from "redux";

import { InAppProduct } from "features/banking-moderation/services";
import { inAppProductKeySelector } from "./inAppProductEntities.reducer";
import {
    inAppProductInfoActionGroup,
    inAppProductInfoLoadingAction,
    inAppProductInfoLoadedOkAction,
    inAppProductInfoLoadedErrorAction
} from "../../actions";
import { AppState } from "app-state";

export interface InAppProductInfoState {
    loading: boolean;
    error?: string;
    data?: InAppProduct;
}

export const inAppProductInfoReducer = inAppProductInfoActionGroup.hashedReducer(
    (props) => inAppProductKeySelector(props.stage, props.id),
    (state: InAppProductInfoState | undefined, action: Action): InAppProductInfoState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (inAppProductInfoLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (inAppProductInfoLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (inAppProductInfoLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export const inAppProductInfoPageSelector =
    (stage: string, id: number) =>
    (appState: AppState): InAppProductInfoState => {
        const detailsPage = appState.inAppProducts.infoPage[inAppProductKeySelector(stage, id)];
        const data = appState.inAppProducts.entities?.[inAppProductKeySelector(stage, id)];

        return {
            loading: detailsPage?.loading ?? false,
            error: detailsPage?.error,
            data
        };
    };
