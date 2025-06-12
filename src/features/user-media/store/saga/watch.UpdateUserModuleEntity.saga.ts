import { call, put, takeEvery } from "redux-saga/effects";

import { updateUserMediaFileEntity, UserMediaFileEntity } from "../../services";
import { addPopUpMessageAction } from "shared/store";
import { updateMediaFileEntityAction, userMediaFileLoadedOkAction } from "../actions";

export function* watchUpdateUserModuleEntitySaga() {
    yield takeEvery(
        updateMediaFileEntityAction.TYPE,
        function* (action: typeof updateMediaFileEntityAction.typeOf.action) {
            try {
                const result: UserMediaFileEntity = yield call(
                    updateUserMediaFileEntity,
                    action.stage,
                    action.mediaFileType,
                    action.data
                );

                yield put(
                    userMediaFileLoadedOkAction({
                        stage: action.stage,
                        mediaFileType: action.mediaFileType,
                        id: result.id,
                        result
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update ${action.mediaFileType} entity. ${(
                            responseError as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
