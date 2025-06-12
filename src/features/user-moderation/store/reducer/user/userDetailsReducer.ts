import { Action } from "redux";

import { AppState } from "app-state";
import { GetUserInfoParams, User } from "../../../services";
import { NormalizedUser, userKeySelector } from "./userEntitiesReducer";
import {
    userDetailsActionGroup,
    userDetailsLoadingAction,
    userDetailsLoadedOkAction,
    userDetailsLoadedErrorAction
} from "../../actions";

export interface UserDetailsState {
    loading: boolean;
    error?: string;
    selectorKey?: string;
}

export const userDetailsReducer = userDetailsActionGroup.hashedReducer(
    userDetailsPageKeySelector,
    (state: UserDetailsState | undefined, action: Action): UserDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (userDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (userDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (userDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                selectorKey: userKeySelector(action.stage, action.result.id)
            };
        }

        return state;
    }
);

export interface UserDetailsPageResult {
    loading: boolean;
    error?: string;
    data?: User;
}

export function userDetailsPageSelector(params: GetUserInfoParams): (appState: AppState) => UserDetailsPageResult {
    return (appState) => {
        const status = appState.user.detailsPage[userDetailsPageKeySelector(params)];

        let normalizedUser: NormalizedUser | undefined;
        if (status?.selectorKey) {
            normalizedUser = appState.user.entities[status.selectorKey];
        } else if (params.selector === "id") {
            normalizedUser = appState.user.entities[userKeySelector(params.stage, params.id)];
        } else if (params.selector === "mainGroupId") {
            normalizedUser = Object.values(appState.user.entities).find((user) => user.mainGroupId == params.id);
        }

        let data: User | undefined;

        if (normalizedUser) {
            data = {
                ...normalizedUser,
                character: normalizedUser.charactersById
                    ?.map((charaKey) => appState.character.entities[charaKey])
                    .filter(Boolean),
                mainCharacter: normalizedUser.mainCharacterById
                    ? appState.character.entities[normalizedUser.mainCharacterById]
                    : undefined
            };
        }

        return {
            loading: status?.loading ?? false,
            error: status?.error,
            data
        };
    };
}

export function userDetailsPageKeySelector(params: GetUserInfoParams) {
    return `${params.stage}/${params.selector}=${params.id}`;
}
