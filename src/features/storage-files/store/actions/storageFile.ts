import { defineAction } from "rd-redux-utils";

import { StorageFile } from "features/storage-files/services";

export const storageFilePostAction =
    defineAction<{ stage: string; data: Partial<StorageFile>; file: File }>("STORAGE FILE: POST");

export const storageFileDeleteAction = defineAction<{ stage: string; id: number }>("STORAGE FILE: DELETE");
