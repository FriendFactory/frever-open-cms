import { Action } from "redux";
import qs from "query-string";

import { StorageFile, StorageFileListQueryParams } from "../../services";
import { storageFileKeySelector } from "./storageFileReducer";
import {
    storageFileListLoadingAction,
    storageFileListLoadedOkAction,
    storageFileListLoadedErrorAction,
    storageFileListActionGroup
} from "../actions";
import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_STORAGE_LIST_SIZE } from "urls";

export interface StorageFileListPageState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: { [pageKey: string]: string[] };
}

export const storageFileListPageReducer = storageFileListActionGroup.hashedReducer(
    ({ stage, params }) => storageFileListKeySelector(stage, params),
    (state: StorageFileListPageState | undefined, action: Action): StorageFileListPageState => {
        if (!state) {
            state = { loading: false };
        }

        if (storageFileListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (storageFileListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (storageFileListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((item) =>
                        storageFileKeySelector(action.stage, item.id)
                    )
                }
            };
        }

        return state;
    }
);

export const pageKeySelector = (skip: number | undefined): string => `skip = ${skip ?? 0}`;

export const storageFileListKeySelector = (stage: string, { skip, ...params }: StorageFileListQueryParams): string =>
    `${stage}/storage-file-list/params:${qs.stringify(params || {})}`;

export const storageFileListPagerSelector =
    (stage: string, { skip, ...params }: StorageFileListQueryParams) =>
    (appState: AppState): PagingInfoSelectResult => {
        const status = appState.storageFile.listPages[storageFileListKeySelector(stage, params)];
        const currentPage = Math.floor((skip ?? 0) / DEFAULT_STORAGE_LIST_SIZE) + 1;
        return {
            total: status?.total ?? 0,
            pageSize: params.take || DEFAULT_STORAGE_LIST_SIZE,
            currentPage
        };
    };

export interface StorageFileListPageSelector {
    loading: boolean;
    error?: string;
    data?: StorageFile[];
}

export const storageFileListPageSelector =
    (stage: string, { skip, ...params }: StorageFileListQueryParams) =>
    (appState: AppState): StorageFileListPageSelector => {
        const { pages, ...status } = appState.storageFile.listPages[storageFileListKeySelector(stage, params)] || {};
        const page = pages?.[pageKeySelector(skip)];

        const data = page?.map((el) => appState.storageFile.entities[el]!).filter(Boolean);
        return {
            ...status,
            data
        };
    };
