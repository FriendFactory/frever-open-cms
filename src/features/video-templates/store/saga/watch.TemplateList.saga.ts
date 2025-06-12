import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { getTemplateList, Template } from "../../services";
import { TEMPLATE_LIST_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    createTemplateListQuery,
    TemplateFilterParams
} from "features/video-templates/services/helpers/createTemplateListQuery";
import {
    templateListLoadingAction,
    templateListLoadedOkAction,
    templateListLoadedErrorAction,
    templateListLoadAction
} from "../actions";

export function* watchTemplateListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = TEMPLATE_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        yield spawn(loadTemplateList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(templateListLoadAction.TYPE, function* (action: typeof templateListLoadAction.typeOf.action) {
        yield spawn(loadTemplateList, action.stage, action.params || {});
    });
}

export function* loadTemplateList(stage: string, params: TemplateFilterParams) {
    const query = createTemplateListQuery(params || {});

    try {
        yield put(templateListLoadingAction({ stage, params }));

        const result: ResultWithCount<Template> = yield call(getTemplateList, stage, query);

        yield put(templateListLoadedOkAction({ stage, params, result }));
    } catch (responseError) {
        yield put(templateListLoadedErrorAction({ stage, params, error: (responseError as Error).toString() }));

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the template list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
