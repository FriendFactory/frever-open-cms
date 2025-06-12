import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";
import { getEntityById } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { EditorSettings } from "../../services/api";
import { EDITOR_SETTINGS_DETAILS_URL } from "urls";
import {
    editorSettingsLoadingAction,
    editorSettingsLoadedOkAction,
    editorSettingsLoadedErrorAction
} from "../actions/editorSettingsDetails";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchEditorSettingsDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EDITOR_SETTINGS_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) {
            return;
        }

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        try {
            yield put(editorSettingsLoadingAction({ stage, id }));

            const result: EditorSettings = yield call(getEntityById, stage, "Editor-Settings", id);

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
                    messageText: `Failed to load Task details. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
