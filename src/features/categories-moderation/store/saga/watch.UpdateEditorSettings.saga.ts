import { call, put, takeEvery } from "redux-saga/effects";

import { EditorSettings } from "features/categories-moderation/services/api";
import { updateEditorSettings } from "features/categories-moderation/services/updateEditorSettings";
import { addPopUpMessageAction } from "shared/store";
import {
    editorSettingsLoadedErrorAction,
    editorSettingsLoadedOkAction,
    updateEditorSettingsAction
} from "../actions/editorSettingsDetails";

export function* watchUpdateEditorSettingsSaga() {
    yield takeEvery(
        updateEditorSettingsAction.TYPE,
        function* (action: typeof updateEditorSettingsAction.typeOf.action) {
            const { stage, id, data } = action;
            try {
                const result: EditorSettings = yield call(updateEditorSettings, stage, id, data);

                yield put(
                    addPopUpMessageAction({
                        messageText: "Editor Settings updated success",
                        messageStyle: "success"
                    })
                );

                yield put(
                    editorSettingsLoadedOkAction({
                        stage,
                        id,
                        result
                    })
                );
            } catch (responseError) {
                yield put(
                    editorSettingsLoadedErrorAction({
                        error: (responseError as Error).toString(),
                        id,
                        stage
                    })
                );

                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update Editor Settings. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
