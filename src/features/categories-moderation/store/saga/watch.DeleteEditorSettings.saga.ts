import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { deleteEditorSettingsAction } from "../actions/editorSettingsDetails";
import { EDITOR_SETTINGS_LIST_URL } from "urls";
import { deleteEntity } from "shared";

export function* watchDeleteEditorSettingsSaga() {
    yield takeEvery(
        deleteEditorSettingsAction.TYPE,
        function* (action: typeof deleteEditorSettingsAction.typeOf.action) {
            const { stage, id } = action;
            try {
                yield call(deleteEntity, stage, "Editor-Settings", id);

                yield put(
                    addPopUpMessageAction({
                        messageText: "Success. Editor Settings deleted.",
                        messageStyle: "success"
                    })
                );

                location.replace(EDITOR_SETTINGS_LIST_URL.format({ stage }));
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to delete Editor Settings. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
