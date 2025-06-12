import { Action } from "redux";

import { UserMediaFileEntity, UserMediaFileType } from "../../services";
import { userMediaFileListLoadedOkAction, userMediaFileLoadedOkAction } from "../actions";

export interface UserMedialFileEntitiesState<T extends UserMediaFileType = UserMediaFileType> {
    [key: string]: UserMediaFileEntity<T>;
}

export const userMediaFileEntitiesReducer = (
    state: UserMedialFileEntitiesState | undefined,
    action: Action
): UserMedialFileEntitiesState => {
    if (!state) {
        state = {};
    }

    if (userMediaFileLoadedOkAction.is(action)) {
        return {
            ...state,
            [userMediaFileKeySelector(action.stage, action.mediaFileType, action.id)]: action.result
        };
    }

    if (userMediaFileListLoadedOkAction.is(action)) {
        return action.result.reduce<UserMedialFileEntitiesState>(
            (acc, el) => {
                acc[userMediaFileKeySelector(action.stage, action.mediaFileType, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }
    return state;
};

export const userMediaFileKeySelector = (stage: string, mediaFileType: UserMediaFileType, id: number): string =>
    `${stage}/${mediaFileType}/${id}`;
