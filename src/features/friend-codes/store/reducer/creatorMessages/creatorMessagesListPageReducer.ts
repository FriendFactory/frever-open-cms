import { Action } from "redux";

import { creatorMessagesListHashKeySelector } from "../../selectors/creatorMessagesListPage";
import {
    creatorMessagesListActionGroup,
    creatorMessagesListLoadingAction,
    creatorMessagesListLoadedOkAction,
    creatorMessagesListLoadedErrorAction
} from "../../actions/creatorMessages";
import { creatorMessageKeySelector } from "./creatorMessagesEntitiesReducer";
import { pageKeySelector } from "utils";

export interface CreatorMessagesListState {
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

export const creatorMessagesListPageReducer = creatorMessagesListActionGroup.hashedReducer(
    (props) => creatorMessagesListHashKeySelector(props.stage, props.params),
    (state: CreatorMessagesListState | undefined, action: Action): CreatorMessagesListState => {
        if (!state) {
            state = initialState;
        }

        if (creatorMessagesListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (creatorMessagesListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (creatorMessagesListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        creatorMessageKeySelector(action.stage, el.groupId)
                    )
                }
            };
        }

        return state;
    }
);
