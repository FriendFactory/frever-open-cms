import { call, put, takeEvery } from "redux-saga/effects";

import { updateTemplateInfo, Template } from "features/video-templates/services";
import { updateTemplateAction, templateLoadedOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { handleTagList } from "shared/store/saga/handleTagList.saga";
import { uploadTemplateThumbnailSaga } from "./uploadTemplateThumbnailSaga";

export function* watchUpdateTemplateInfoSaga() {
    yield takeEvery(updateTemplateAction.TYPE, function* (action: typeof updateTemplateAction.typeOf.action) {
        const { stage, id } = action;
        try {
            const data: Partial<Template & { thumbnailUploadId?: string }> = { ...action.data };

            if (action.file) data.thumbnailUploadId = yield* uploadTemplateThumbnailSaga(action.stage, action.file);
            if (action.tags) data.tags = yield* handleTagList(action.stage, action.tags);

            const result: Template = yield call(updateTemplateInfo, stage, id, data);

            yield put(templateLoadedOkAction({ stage, id, result }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Template update completed. The changes you made have been saved and applied.",
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update template. An error occurred while attempting to update the template. ${
                        (responseError as Error).message
                    }`,
                    messageStyle: "error"
                })
            );
        }
    });
}
