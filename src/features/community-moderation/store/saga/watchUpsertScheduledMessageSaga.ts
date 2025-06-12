import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { upsertScheduledMessageAction, upsertScheduledMessageOkAction } from "../actions/scheduledMessageList";
import { ScheduledMessage } from "features/community-moderation/services/api";
import { postScheduledMessage } from "features/community-moderation/services/scheduledMessage/postScheduledMessage";
import { MASS_SEND_OUTS_LIST_PAGE_URL } from "urls";
import { loadScheduledMessage } from "./watchScheduledMessageListSaga";
import { initUpload, InitUpload, uploadFile } from "shared";
import { FileExtensions } from "config";

const SCHEDULED_MESSAGE_UPSERT_KEY = "SCHEDULED_MESSAGE_UPSERT_KEY";

export function* watchUpsertScheduledMessageSaga() {
    yield takeEvery(
        upsertScheduledMessageAction.TYPE,
        function* (action: typeof upsertScheduledMessageAction.typeOf.action) {
            yield* handleUpsertScheduledMessage(action.stage, action.data as ScheduledMessage, action.file);
        }
    );
}

export function* handleUpsertScheduledMessage(stage: string, data: ScheduledMessage, file?: File) {
    try {
        yield put(
            addPopUpMessageAction({
                messageText: `Pending...`,
                messageStyle: "loading",
                duration: 0,
                key: SCHEDULED_MESSAGE_UPSERT_KEY
            })
        );

        if (file) {
            const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);

            yield call(uploadFile, uploadUrl, file);

            const newImage = {
                file: 0,
                extension: FileExtensions.Jpg,
                resolution: null,
                version: null,
                source: { uploadId }
            };
            data.files = [newImage as any];
        }

        const scheduledMessage: ScheduledMessage = yield call(postScheduledMessage, stage, data);

        yield put(
            upsertScheduledMessageOkAction({
                stage,
                data: [scheduledMessage]
            })
        );

        const scheduledMessageListUrlMatch = MASS_SEND_OUTS_LIST_PAGE_URL.match(location);
        if (scheduledMessageListUrlMatch.isMatched) {
            yield* loadScheduledMessage(
                scheduledMessageListUrlMatch.params.stage,
                scheduledMessageListUrlMatch.query || {}
            );
        }

        yield put(
            addPopUpMessageAction({
                messageText: "Success",
                messageStyle: "success",
                key: SCHEDULED_MESSAGE_UPSERT_KEY
            })
        );
    } catch (e) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to post scheduled message. ${(e as Error).toString()}`,
                messageStyle: "error",
                key: SCHEDULED_MESSAGE_UPSERT_KEY
            })
        );
    }
}
