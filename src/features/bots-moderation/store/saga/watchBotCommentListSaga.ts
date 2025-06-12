import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { checkUserAccess } from "shared/checkUserAccess";
import { BOT_COMMENT_LIST_PAGE_URL } from "urls/botModerationURLs";
import { BotComment, BotCommentListQueryParams, getBotComments } from "features/bots-moderation/services";
import {
    botCommentListLoadingAction,
    botCommentListLoadedOkAction,
    botCommentListLoadedErrorAction,
    botCommentListLoadAction
} from "../actions";

export function* watchBotCommentListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = BOT_COMMENT_LIST_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadBotCommentList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(botCommentListLoadAction.TYPE, function* (action: typeof botCommentListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadBotCommentList, action.stage, action.params || {});
    });
}

export function* loadBotCommentList(stage: string, params: BotCommentListQueryParams) {
    try {
        yield put(botCommentListLoadingAction({ stage, params }));

        const result: ResultWithCount<BotComment> = yield call(getBotComments, stage, params);

        yield put(
            botCommentListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (e) {
        yield put(
            botCommentListLoadedErrorAction({
                error: (e as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load bot list. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
