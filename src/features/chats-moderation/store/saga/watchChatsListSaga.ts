import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { CHATS_LIST_PAGE_URL, USER_DETAILS_INFO_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import { ChatInfo, ChatListQueryParams, getChatList, getChatListByUser } from "features/chats-moderation/services";
import {
    chatsListLoadingAction,
    chatsListLoadedOkAction,
    chatsListLoadedErrorAction,
    chatsListByUserLoadAction
} from "../actions";

export function* watchChatsListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHATS_LIST_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadChatsListSaga, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(chatsListByUserLoadAction.TYPE, function* (action: typeof chatsListByUserLoadAction.typeOf.action) {
        const urlMatch = USER_DETAILS_INFO_URL.match(location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadChatsListByUserSaga, urlMatch.params.stage, action.mainGroupId);
    });
}

function* loadChatsListSaga(stage: string, params: ChatListQueryParams) {
    try {
        yield put(chatsListLoadingAction({ stage, params }));

        const data: ChatInfo[] = yield call(getChatList, stage, params);

        yield put(chatsListLoadedOkAction({ stage, params, data }));
    } catch (e) {
        yield put(
            chatsListLoadedErrorAction({ stage, params, error: `Failed to load chats list. ${(e as Error).message}` })
        );
    }
}

function* loadChatsListByUserSaga(stage: string, mainGroupId: number) {
    try {
        yield put(chatsListLoadingAction({ stage, params: { members: [mainGroupId] } }));

        const data: ChatInfo[] = yield call(getChatListByUser, stage, mainGroupId);

        yield put(chatsListLoadedOkAction({ stage, params: { members: [mainGroupId] }, data }));
    } catch (e) {
        yield put(
            chatsListLoadedErrorAction({
                stage,
                params: { members: [mainGroupId] },
                error: `Failed to load chats list. ${(e as Error).message}`
            })
        );
    }
}
