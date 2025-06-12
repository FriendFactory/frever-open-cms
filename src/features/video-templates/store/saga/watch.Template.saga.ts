import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { getTemplate, Template } from "../../services";
import { TEMPLATE_DETAILS_URL } from "urls";
import { templateLoadingAction, templateLoadedOkAction, templateLoadedErrorAction } from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";
import { handleTemplateSoundURL } from "./handleTemplateSoundURL";

export function* watchTemplateSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = TEMPLATE_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;
        try {
            yield put(templateLoadingAction({ stage, id }));

            const result: Template = yield call(getTemplate, stage, id);
            const eventSoundURL: string | undefined = yield* handleTemplateSoundURL(stage, result.eventId);

            yield put(templateLoadedOkAction({ stage, id, result, eventSoundURL }));
        } catch (responseError) {
            yield put(
                templateLoadedErrorAction({
                    stage,
                    id,
                    error: `Failed to load template. ${(responseError as Error).message}`
                })
            );
        }
    });
}
