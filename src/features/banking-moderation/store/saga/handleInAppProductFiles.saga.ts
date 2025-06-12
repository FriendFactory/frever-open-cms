import { call } from "redux-saga/effects";

import { FileExtensions } from "config";
import { InAppProductDetailsFile } from "features/banking-moderation/containers/InAppProductInfo/SpecialOfferListContainer";
import { ThumbnailFile, InitUpload, initUpload, uploadFile } from "shared";

export function* handleInAppProductFiles(
    stage: string,
    items: InAppProductDetailsFile[] | undefined,
    currentFiles: ThumbnailFile[] = []
) {
    if (!items) return currentFiles;
    const result = [...currentFiles];

    for (const item of items) {
        const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);
        yield call(uploadFile, uploadUrl, item.file);

        const newThumbnail = {
            file: 1,
            extension: FileExtensions.Png,
            resolution: item.resolution,
            version: null,
            source: {
                uploadId
            }
        };

        const infexOfCurrentItem = result.findIndex((el) => el.resolution === newThumbnail.resolution);

        infexOfCurrentItem !== -1 ? (result[infexOfCurrentItem] = newThumbnail) : result.push(newThumbnail);
    }

    return result;
}
