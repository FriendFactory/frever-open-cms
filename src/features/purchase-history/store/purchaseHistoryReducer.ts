import { Action } from "redux";

import { InAppPurchaseOrder } from "../services";
import {
    purchaseHistoryActionGroup,
    purchaseHistoryLoadingAction,
    purchaseHistoryLoadedOkAction,
    purchaseHistoryLoadedErrorAction
} from "./purchaseHistoryActions";
import { pageKeySelector, purchaseHistoryKeySelector } from "./purchaseHistorySelector";

export interface PurchaseHistoryListState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: InAppPurchaseOrder[];
    };
}

export const purchaseHistoryReducer = purchaseHistoryActionGroup.hashedReducer(
    (props) => purchaseHistoryKeySelector(props.stage, props.groupId),
    (state: PurchaseHistoryListState | undefined, action: Action): PurchaseHistoryListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (purchaseHistoryLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (purchaseHistoryLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (purchaseHistoryLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip, action.params.take)]: action.result
                }
            };
        }

        return state;
    }
);
