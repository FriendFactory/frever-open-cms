import * as qs from "query-string";
import { Action } from "redux";

import { PagingInfoSelectResult } from "shared";
import {
    GetUserPhotoParams,
    GetUserSoundParams,
    GetUserVideoClipParams,
    UserMediaFileEntity,
    UserMediaFileType
} from "../../services";
import { AppState } from "app-state";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE } from "urls";
import { calculateListTotal } from "shared/calculate-list-total";
import { userMediaFileKeySelector } from "./userMediaFileEntitiesReducer";
import {
    userMediaFileListActionGroup,
    userMediaFileListLoadingAction,
    userMediaFileListLoadedOkAction,
    userMediaFileListLoadedErrorAction
} from "../actions";

export interface UserMediaFileListState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: string[];
    };
}

export const userMediaFileListReducer = userMediaFileListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.mediaFileType, props.params),
    (state: UserMediaFileListState | undefined, action: Action): UserMediaFileListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (userMediaFileListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (userMediaFileListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (userMediaFileListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.map((el) =>
                        userMediaFileKeySelector(action.stage, action.mediaFileType, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface UserMediaFileListResult<T extends UserMediaFileType = UserMediaFileType>
    extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: UserMediaFileEntity<T>[];
    stage: string;
}

export function userMediaFileListPageSelector<T extends UserMediaFileType>(
    stage: string,
    mediaFileType: T,
    params: GetUserPhotoParams | GetUserSoundParams | GetUserVideoClipParams = {}
): (appState: AppState) => UserMediaFileListResult<T> {
    return (appState) => {
        const userMediaFileList = appState.userMedia.listPages[hashKeySelector(stage, mediaFileType, params)];
        const page = userMediaFileList?.pages[pageKeySelector(params.skip)];

        const data = page?.map((el) => appState.userMedia.entities?.[el] as UserMediaFileEntity<T>);
        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_LEVEL_LIST_PAGE_SIZE) + 1;
        return {
            error: userMediaFileList?.error,
            loading: userMediaFileList?.loading ?? false,
            data,
            stage,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_LEVEL_LIST_PAGE_SIZE),
            pageSize: DEFAULT_LEVEL_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

const hashKeySelector = (
    stage: string,
    mediaFileType: UserMediaFileType,
    { skip, ...keyParams }: GetUserPhotoParams | GetUserSoundParams | GetUserVideoClipParams = {}
): string => `${stage}/${mediaFileType}/${qs.stringify((keyParams as any) ?? {})}`;

const pageKeySelector = (skip: number | undefined): string => `skip = ${skip ?? 0}`;
