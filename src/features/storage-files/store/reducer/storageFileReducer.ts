import { Action } from "redux";

import { StorageFile } from "features/storage-files/services";
import { storageFileListLoadedOkAction } from "../actions";

export interface StorageFileState {
    [key: string]: StorageFile;
}

export const storageFileEntitiesReducer = (state: StorageFileState | undefined, action: Action): StorageFileState => {
    if (!state) {
        state = {};
    }

    if (storageFileListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...action.result.data.reduce<StorageFileState>((acc, el) => {
                acc[storageFileKeySelector(action.stage, el.id)] = el;

                return acc;
            }, {})
        };
    }

    return state;
};

export const storageFileKeySelector = (stage: string, id: number): string => `${stage}/storage-file/${id}`;
