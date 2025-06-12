import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";
import { addPopUpMessageAction } from "shared/store";

import { getOutfitList, Outfit } from "../../services";
import { USER_OUTFIT_LIST_TAB_URL } from "urls";
import { outfitListLoadingAction, outfitListLoadedOkAction, outfitListLoadedErrorAction } from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchOutfitListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_OUTFIT_LIST_TAB_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const actionParams = {
            stage: urlMatch.params.stage,
            params: urlMatch.query || {}
        };

        try {
            yield put(outfitListLoadingAction(actionParams));

            const result: Outfit[] = yield call(getOutfitList, urlMatch.params.stage, urlMatch.query || {}, [
                "outfitAndWardrobe"
            ]);

            yield put(
                outfitListLoadedOkAction({
                    ...actionParams,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                outfitListLoadedErrorAction({
                    error: (responseError as Error).toString(),
                    ...actionParams
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the outfit list. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
