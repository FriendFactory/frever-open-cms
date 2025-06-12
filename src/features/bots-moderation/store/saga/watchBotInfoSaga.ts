import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { botInfoLoadingAction, botInfoLoadedOkAction, botInfoLoadedErrorAction } from "../actions";
import { BOT_DETAILS_PAGE_URL } from "urls/botModerationURLs";
import { Bot } from "features/bots-moderation/services";
import { getEntityById } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";
import { userListLoadAction } from "features/user-moderation";

export function* watchBotInfoSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = BOT_DETAILS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadBotInfo, urlMatch.params.stage, urlMatch.params.id);
    });
}

export function* loadBotInfo(stage: string, id: number) {
    try {
        yield put(botInfoLoadingAction({ stage, id }));

        const result: Bot = yield call(getEntityById, stage, "bot", id);

        yield put(
            botInfoLoadedOkAction({
                stage,
                id,
                result
            })
        );

        if (result) {
            yield put(userListLoadAction({ stage, params: { mainGroupId: result.groupId + "" } }));
        }
    } catch (e) {
        yield put(
            botInfoLoadedErrorAction({
                stage,
                id,
                error: (e as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load bot info with comments. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
