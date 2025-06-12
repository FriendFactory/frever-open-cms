import { Action } from "redux";

import { creatorCodesListHashKeySelector } from "../../selectors/creatorCodesListPage";
import {
    creatorCodesListActionGroup,
    creatorCodesListLoadingAction,
    creatorCodesListLoadedOkAction,
    creatorCodesListLoadedErrorAction
} from "../../actions/creatorCodes";
import { creatorCodeKeySelector } from "./creatorCodesEntitiesReducer";
import { pageKeySelector } from "utils";

export interface CreatorCodesListState {
    loading: boolean;
    error?: string;
    total?: number;
    pages: {
        [pageKey: string]: string[];
    };
}

const initialState = {
    loading: false,
    pages: {}
};

export const creatorCodesListPageReducer = creatorCodesListActionGroup.hashedReducer(
    (props) => creatorCodesListHashKeySelector(props.stage, props.params),
    (state: CreatorCodesListState | undefined, action: Action): CreatorCodesListState => {
        if (!state) {
            state = initialState;
        }

        if (creatorCodesListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (creatorCodesListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (creatorCodesListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        creatorCodeKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);
