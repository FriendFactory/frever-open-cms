import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { botListLoadingAction, botListLoadedOkAction, botListLoadedErrorAction } from "../actions";
import { BOT_LIST_PAGE_URL } from "urls/botModerationURLs";
import { Bot, BotListQueryParams, getBots } from "features/bots-moderation/services";
import { ResultWithCount } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";
import { userListLoadAction } from "features/user-moderation";

export function* watchBotListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = BOT_LIST_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadBotList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadBotList(stage: string, params: BotListQueryParams) {
    try {
        yield put(botListLoadingAction({ stage, params }));

        const result: ResultWithCount<Bot> = yield call(getBots, stage, params);

        yield put(
            botListLoadedOkAction({
                stage,
                params,
                result
            })
        );

        if (result.count > 0) {
            yield put(
                userListLoadAction({ stage, params: { mainGroupId: result.data.map((el) => el.groupId).join(",") } })
            );
        }
    } catch (e) {
        yield put(
            botListLoadedErrorAction({
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
