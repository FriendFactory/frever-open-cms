import { call, put, takeEvery } from "redux-saga/effects";

import { Task, updateTask } from "../../services";
import { uploadCustomTaskThumbAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { initUpload, uploadFile } from "shared";
import { putTaskDetailsSaga } from "./watch.TaskDetails.saga";

export function* watchCustomTaskThumbnailSaga() {
    yield takeEvery(
        uploadCustomTaskThumbAction.TYPE,
        function* (action: typeof uploadCustomTaskThumbAction.typeOf.action) {
            try {
                const { uploadUrl, uploadId }: any = yield call(initUpload, action.stage);

                yield call(uploadFile, uploadUrl, action.data);

                const result: Task = yield call(updateTask, action.stage, action.id, { thumbnailUploadId: uploadId });

                yield* putTaskDetailsSaga(action.stage, action.id, result);

                yield put(
                    addPopUpMessageAction({
                        messageText: "Task thumbnail updated successfully.",
                        messageStyle: "success"
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update the Task thumbnail. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
