import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { BattleReward, updateRewardSoftCurrency } from "features/video-tasks/services";
import { battleRewardsUpdatedOkAction, updateBattleRewardsAction } from "../actions";

export function* watchUpdateBattleRewardSaga() {
    yield takeEvery(updateBattleRewardsAction.TYPE, function* (action: typeof updateBattleRewardsAction.typeOf.action) {
        try {
            const updatedReward: BattleReward = yield call(updateRewardSoftCurrency, action.stage, action.data);

            yield put(battleRewardsUpdatedOkAction({ stage: action.stage, result: [updatedReward] }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Battle Reward updated",
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update Battle Reward. ${(responseError as Error).message}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
