import qs from "query-string";

import { request, ResultWithCount } from "shared";
import { DEFAULT_STORAGE_LIST_SIZE } from "urls";
import { StorageFile } from "./api";

export interface StorageFileListQueryParams {
    skip?: number;
    take?: number;
    key?: string;
}

export const getStorageFileList = async (
    stage: string,
    params: StorageFileListQueryParams
): Promise<ResultWithCount<StorageFile>> => {
    const query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_STORAGE_LIST_SIZE,
        $orderBy: "id desc"
    });
    const response = await request(stage).assetmanager().get(`api/storage-file/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
