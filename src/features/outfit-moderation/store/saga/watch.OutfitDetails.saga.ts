import { call, fork, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { OUTFIT_DETAILS_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { outfitDetailsLoadingAction, outfitDetailsLoadedOkAction, outfitDetailsLoadedErrorAction } from "../actions";
import { getOutfitList, Outfit } from "features/outfit-moderation/services";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchOutfitDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = OUTFIT_DETAILS_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield fork(loadOutfitDetails, urlMatch.params.stage, urlMatch.params.id);
    });
}

export function* loadOutfitDetails(stage: string, id: number) {
    try {
        yield put(outfitDetailsLoadingAction({ stage, id }));

        const result: Outfit[] = yield call(getOutfitList, stage, { id }, ["outfitAndWardrobe($expand=Wardrobe)"]);

        if (!result[0]) {
            throw new Error("404. Not found");
        }

        yield put(
            outfitDetailsLoadedOkAction({
                stage,
                id,
                result: result[0]
            })
        );
    } catch (responseError) {
        yield put(
            outfitDetailsLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                id
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the outfit details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
