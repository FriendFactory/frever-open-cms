import { Action } from "redux";

import { AppState } from "app-state";
import { userMediaFileKeySelector } from "./userMediaFileEntitiesReducer";
import { UserMediaFileEntity, UserMediaFileType } from "features/user-media/services";
import {
    userMediaFileActionGroup,
    userMediaFileLoadingAction,
    userMediaFileLoadedOkAction,
    userMediaFileLoadedErrorAction
} from "../actions";

export interface UserMediaFileDetailsState {
    loading: boolean;
    error?: string;
}

export const userMediaFileDetailsReducer = userMediaFileActionGroup.hashedReducer(
    (props) => userMediaFileKeySelector(props.stage, props.mediaFileType, props.id),
    (state: UserMediaFileDetailsState | undefined, action: Action): UserMediaFileDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (userMediaFileLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (userMediaFileLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (userMediaFileLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export interface UserMediaFileDetailsResult<T extends UserMediaFileType = UserMediaFileType>
    extends UserMediaFileDetailsState {
    data: UserMediaFileEntity<T>;
}

export function userMediaFileSelector<T extends UserMediaFileType = UserMediaFileType>(
    stage: string,
    mediaFileType: T,
    id: number
): (appState: AppState) => UserMediaFileDetailsResult<T> {
    return (appState) => {
        const keySelector = userMediaFileKeySelector(stage, mediaFileType, id);
        const userMediaFileState = appState.userMedia.detailsPages[keySelector];
        const data = appState.userMedia.entities[keySelector] as UserMediaFileEntity<T>;

        return {
            loading: userMediaFileState?.loading ?? false,
            error: userMediaFileState?.error ?? undefined,
            data
        };
    };
}
