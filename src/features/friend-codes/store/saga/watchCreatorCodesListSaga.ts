import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { CREATOR_CODES_LIST_PAGE } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { CreatorCodesQueryParams, StarCreatorCode, getCreatorCodes } from "../../services";
import {
    creatorCodesListLoadingAction,
    creatorCodesListLoadedOkAction,
    creatorCodesListLoadedErrorAction
} from "../actions/creatorCodes";
import { checkUserAccess } from "shared/checkUserAccess";
import { ResultWithCount } from "shared";
import { userListLoadAction } from "features/user-moderation";

export function* watchCreatorCodesListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREATOR_CODES_LIST_PAGE.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage } = urlMatch.params;
        const params = urlMatch.query || {};

        yield spawn(loadCreatorCodesList, stage, params || {});
    });
}

export function* loadCreatorCodesList(stage: string, params: CreatorCodesQueryParams) {
    try {
        yield put(creatorCodesListLoadingAction({ stage, params }));

        const result: ResultWithCount<StarCreatorCode> = yield call(getCreatorCodes, stage, params);

        yield put(
            creatorCodesListLoadedOkAction({
                stage,
                params,
                result
            })
        );

        if (result.count > 0) {
            yield put(
                userListLoadAction({
                    stage,
                    params: { mainGroupId: result.data.map((el) => el.groupId).join(",") }
                })
            );
        }
    } catch (responseError) {
        yield put(
            creatorCodesListLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load creator codes list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
