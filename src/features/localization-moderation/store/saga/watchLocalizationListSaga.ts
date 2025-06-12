import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE, RouterLocation } from "connected-react-router";

import { addPopUpMessageAction } from "shared/store";
import { getLocalizationList, Localization, LocalizationQueryParams } from "features/localization-moderation/services";
import { LOCALIZATION_LIST_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    localizationListLoadingAction,
    localizationListLoadedOkAction,
    localizationListLoadedErrorAction
} from "../actions/localizationList";
import { ResultWithCount } from "shared";

export function* watchLocalizationListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = LOCALIZATION_LIST_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadLocalizationList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* localizationListPageWorker(location: Location | RouterLocation<any>) {
    const urlMatch = LOCALIZATION_LIST_URL.match(location, true);
    if (urlMatch.isMatched) yield spawn(loadLocalizationList, urlMatch.params.stage, urlMatch.query || {});
}

export function* loadLocalizationList(stage: string, params: LocalizationQueryParams) {
    try {
        yield put(localizationListLoadingAction({ stage, params }));

        const result: ResultWithCount<Localization> = yield call(getLocalizationList, stage, params);

        yield put(
            localizationListLoadedOkAction({
                stage,
                params,
                data: result.data,
                total: result.count
            })
        );
    } catch (responseError) {
        yield put(
            localizationListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Localization list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
