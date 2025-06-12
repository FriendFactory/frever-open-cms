import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { ResultWithCount } from "shared";

import { addPopUpMessageAction } from "shared/store";
import { getHashtagList, Hashtag } from "../../services";
import { HASHTAG_LIST_PAGE_URL, HASHTAG_SORTING_PAGE_URL } from "urls";
import {
    hashtagListLoadedOkAction,
    hashtagListLoadedErrorAction,
    hashtagListLoadingAction,
    hashtagListLoadAction,
    HashtagListParams
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchHashtagListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatchListPage = HASHTAG_LIST_PAGE_URL.match(action.payload.location, true);
        if (urlMatchListPage.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;
            yield spawn(loadHashtagList, {
                stage: urlMatchListPage.params.stage,
                params: urlMatchListPage.query ?? {}
            });
        }

        const urlMatchSortingPage = HASHTAG_SORTING_PAGE_URL.match(action.payload.location, true);
        if (urlMatchSortingPage.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;
            yield spawn(loadHashtagList, {
                stage: urlMatchSortingPage.params.stage,
                params: urlMatchSortingPage.query ?? {}
            });
        }
    });

    yield takeEvery(hashtagListLoadAction.TYPE, function* (action: typeof hashtagListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;
        yield spawn(loadHashtagList, {
            stage: action.stage,
            params: action.params ?? {}
        });
    });
}

export function* loadHashtagList({ stage, params }: HashtagListParams) {
    try {
        yield put(hashtagListLoadingAction({ stage, params }));

        const result: ResultWithCount<Hashtag> = yield call(getHashtagList, stage, params);

        yield put(
            hashtagListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            hashtagListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the hashtag list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
