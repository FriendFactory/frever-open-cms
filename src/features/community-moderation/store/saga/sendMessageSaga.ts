import { call, put } from "redux-saga/effects";

import { FileExtensions } from "config";
import { initUpload, InitUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { SendMessageFormData } from "features/community-moderation/components/SendMessage/SendMessageForm";
import { sendMessage, SendMessageData } from "features/community-moderation/services/sendMessage";

export function* sendMessageSaga(stage: string, chatId: number, formData: SendMessageFormData) {
    try {
        let files: any = [];

        if (formData.imageFile) {
            const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);

            yield call(uploadFile, uploadUrl, formData.imageFile);

            const newImage = {
                file: 0,
                extension: FileExtensions.Jpg,
                resolution: null,
                version: null,
                source: { uploadId }
            };
            files = [newImage];
        }

        const message: SendMessageData = {
            text: formData?.text,
            replyToMessageId: formData.replyMessage?.id,
            videoId: formData?.video?.id,
            files
        };

        yield call(sendMessage, stage, chatId, message);
    } catch (e) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to sends message. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
