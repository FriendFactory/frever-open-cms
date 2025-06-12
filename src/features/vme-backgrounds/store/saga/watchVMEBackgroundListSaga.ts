import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE, RouterLocation } from "connected-react-router";

import { addPopUpMessageAction } from "shared/store";

import { VME_BACKGROUND_LIST_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    vmeBackgroundListLoadingAction,
    vmeBackgroundListLoadedOkAction,
    vmeBackgroundListLoadedErrorAction
} from "../actions/vmeBackgroundList";
import { getVMEBackground, VMEBackground, VMEBackgroundQueryParams } from "features/vme-backgrounds/services";

export function* watchVMEBackgroundListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = VME_BACKGROUND_LIST_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield spawn(loadVMEBackgroundList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* vmeBackgroundListPageWorker(location: Location | RouterLocation<any>) {
    const urlMatch = VME_BACKGROUND_LIST_URL.match(location, true);
    if (urlMatch.isMatched) yield spawn(loadVMEBackgroundList, urlMatch.params.stage, urlMatch.query || {});
}

export function* loadVMEBackgroundList(stage: string, params: VMEBackgroundQueryParams) {
    try {
        yield put(vmeBackgroundListLoadingAction({ stage, params }));

        const data: VMEBackground[] = yield call(getVMEBackground, stage, params);

        yield put(
            vmeBackgroundListLoadedOkAction({
                stage,
                params,
                data
            })
        );
    } catch (responseError) {
        yield put(
            vmeBackgroundListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the VME Background list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
