import { all, call, put, takeEvery } from "redux-saga/effects";

import { postEntity, initUpload, InitUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { promotedSongPostAction } from "../actions";
import { promotedSongListPageWorker } from "./watchPromotedSongListSaga";
import { PromotedSong } from "features/promoted-songs/services";

export function* watchPostPromotedSongSaga() {
    yield takeEvery(promotedSongPostAction.TYPE, function* (action: typeof promotedSongPostAction.typeOf.action) {
        yield put(
            addPopUpMessageAction({
                messageText: "Pending...",
                messageStyle: "loading",
                duration: 0,
                key: action.stage
            })
        );

        const results: { status: "fulfilled" | "rejected" }[] = yield all(
            action.items.map((item) => call(postPromotedSongSaga, action.stage, item.data, item.file))
        );

        const success = results.every((result) => result.status === "fulfilled");

        if (success) {
            yield put(
                addPopUpMessageAction({
                    messageText:
                        "id" in action.items[0].data
                            ? "Changes have been saved"
                            : "The new promoted song has been created.",
                    messageStyle: "success",
                    key: action.stage
                })
            );
        } else {
            yield put(
                addPopUpMessageAction({
                    messageText: "Failed to POST promoted song.",
                    messageStyle: "error",
                    key: action.stage
                })
            );
        }

        yield* promotedSongListPageWorker(location);
    });
}

function* postPromotedSongSaga(stage: string, item: Partial<PromotedSong>, file?: File) {
    try {
        const data = { ...item };

        if (file) {
            const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);

            yield call(uploadFile, uploadUrl, file);

            data.files = [
                {
                    source: { uploadId },
                    version: null,
                    file: 1,
                    extension: 5,
                    resolution: "512x512"
                }
            ];
        }

        yield call(postEntity, stage, "music/moderation/promoted-song", data);
        return { status: "fulfilled" };
    } catch (responseError) {
        yield put(
            addPopUpMessageAction({
                messageText: `${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
        return { status: "rejected" };
    }
}
