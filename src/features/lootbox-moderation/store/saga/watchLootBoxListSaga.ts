import { call, spawn, put, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import {
    lootBoxListLoadAction,
    lootBoxListLoadingAction,
    lootBoxListLoadedOkAction,
    lootBoxListLoadedErrorAction
} from "../actions";

import { getLootBoxList, LootBox, LootBoxQueryParams } from "../../services";

export function* watchLootBoxListSaga() {
    yield takeEvery(lootBoxListLoadAction.TYPE, function* (action: typeof lootBoxListLoadAction.typeOf.action) {
        const { stage, params } = action;
        yield spawn(loadLootBoxList, stage, params);
    });
}

export function* loadLootBoxList(stage: string, params: LootBoxQueryParams) {
    try {
        yield put(lootBoxListLoadingAction({ stage, params }));

        const result: ResultWithCount<LootBox> = yield call(getLootBoxList, stage, params);

        yield put(
            lootBoxListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            lootBoxListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Loot Box list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
