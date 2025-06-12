import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { StorageFile, StorageFileListQueryParams } from "../../services";

export const storageFileListActionGroup =
    defineActionGroup<{ stage: string; params: StorageFileListQueryParams }>("STORAGE FILE LIST");

export const storageFileListLoadingAction = storageFileListActionGroup.defineAction("LOADING");

export const storageFileListLoadAction = storageFileListActionGroup.defineAction("LOAD");

export const storageFileListLoadedOkAction =
    storageFileListActionGroup.defineAction<{ result: ResultWithCount<StorageFile> }>("RESPONSE OK");

export const storageFileListLoadedErrorAction =
    storageFileListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");
