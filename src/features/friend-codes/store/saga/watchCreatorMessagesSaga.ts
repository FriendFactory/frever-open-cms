import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { CREATOR_WELCOME_MESSAGES_PAGE } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    CreatorWelcomeMessagesQueryParams,
    StarCreatorWelcomeMessage,
    getCreatorWelcomeMessages
} from "../../services";
import {
    creatorMessagesListLoadingAction,
    creatorMessagesListLoadedOkAction,
    creatorMessagesListLoadedErrorAction
} from "../actions/creatorMessages";
import { checkUserAccess } from "shared/checkUserAccess";
import { ResultWithCount } from "shared";
import { userListLoadAction } from "features/user-moderation";

export function* watchCreatorMessagesSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREATOR_WELCOME_MESSAGES_PAGE.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage } = urlMatch.params;
        const params = urlMatch.query || {};

        yield spawn(loadCreatorMessages, stage, params || {});
    });
}

export function* loadCreatorMessages(stage: string, params: CreatorWelcomeMessagesQueryParams) {
    try {
        yield put(creatorMessagesListLoadingAction({ stage, params }));

        const result: ResultWithCount<StarCreatorWelcomeMessage> = yield call(getCreatorWelcomeMessages, stage, params);

        yield put(
            creatorMessagesListLoadedOkAction({
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
            creatorMessagesListLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load star creator messages list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
