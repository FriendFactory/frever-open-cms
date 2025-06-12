import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE, RouterLocation } from "connected-react-router";

import { addPopUpMessageAction } from "shared/store";
import { BACKGROUND_AI_LIST_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    BackgroundAIQueryParams,
    getBackgroundsAI
} from "features/vme-backgrounds/services/BackgroundAI/getBackgroundsAI";
import {
    backgroundAIListLoadedErrorAction,
    backgroundAIListLoadedOkAction,
    backgroundAIListLoadingAction
} from "../../actions/BackgroundAI";
import { BackgroundAI } from "features/vme-backgrounds/services";

export function* watchBackgroundAIListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = BACKGROUND_AI_LIST_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield spawn(loadBackgroundAIList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* backgroundAIListPageWorker(location: Location | RouterLocation<any>) {
    const urlMatch = BACKGROUND_AI_LIST_URL.match(location, true);
    if (urlMatch.isMatched) yield spawn(loadBackgroundAIList, urlMatch.params.stage, urlMatch.query || {});
}

export function* loadBackgroundAIList(stage: string, params: BackgroundAIQueryParams) {
    try {
        yield put(backgroundAIListLoadingAction({ stage, params }));

        const data: BackgroundAI[] = yield call(getBackgroundsAI, stage, params);

        yield put(
            backgroundAIListLoadedOkAction({
                stage,
                params,
                data
            })
        );
    } catch (responseError) {
        yield put(
            backgroundAIListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the VME AI Background list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
