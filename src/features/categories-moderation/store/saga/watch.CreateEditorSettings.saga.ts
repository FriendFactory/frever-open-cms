import { call, put, takeEvery } from "redux-saga/effects";

import { EditorSettings } from "features/categories-moderation/services/api";
import { addPopUpMessageAction } from "shared/store";
import { editorSettingsLoadedOkAction, createEditorSettingsAction } from "../actions/editorSettingsDetails";
import { postEntity } from "shared";
import { EDITOR_SETTINGS_DETAILS_URL } from "urls";

export function* watchCreateEditorSettingsSaga() {
    yield takeEvery(
        createEditorSettingsAction.TYPE,
        function* (action: typeof createEditorSettingsAction.typeOf.action) {
            const { stage, data } = action;
            try {
                const result: EditorSettings = yield call(postEntity, stage, "Editor-Settings", data);

                yield put(
                    addPopUpMessageAction({
                        messageText: "Success. Editor Settings created.",
                        messageStyle: "success",
                        link: EDITOR_SETTINGS_DETAILS_URL.format({ stage, id: result.id })
                    })
                );

                yield put(
                    editorSettingsLoadedOkAction({
                        stage,
                        id: result.id,
                        result
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to create Editor Settings. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
