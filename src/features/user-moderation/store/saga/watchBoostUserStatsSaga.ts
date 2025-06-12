import { call, put, takeEvery } from "redux-saga/effects";

import { boostUserXp, getUserProfileKPI, increaseCurrencySupply, UserProfileKPI } from "../../services";
import { addPopUpMessageAction } from "shared/store";
import { boostUserStatsAction, updateUserSocialProfieAction } from "../actions";
import { USER_DETAILS_INFO_URL } from "urls";

export function* watchBoostUserStatsSaga() {
    yield takeEvery(boostUserStatsAction.TYPE, function* (action: typeof boostUserStatsAction.typeOf.action) {
        try {
            if (action.command.type === "Currency") {
                yield call(increaseCurrencySupply, action.stage, action.command.value);
            }

            if (action.command.type === "Xp") {
                yield call(boostUserXp, action.stage, action.command.groupId, action.command.value);
            }

            const urlMatch = USER_DETAILS_INFO_URL.match(location, true);
            if (urlMatch.isMatched) {
                const groupId =
                    action.command.type === "Currency" ? action.command.value.groupIds[0] : action.command.groupId;

                const result: UserProfileKPI = yield call(getUserProfileKPI, action.stage, groupId);

                yield put(
                    updateUserSocialProfieAction({
                        stage: action.stage,
                        groupId,
                        result
                    })
                );
            }

            yield put(
                addPopUpMessageAction({
                    messageText: `Success! ${action.command.type} Boost Applied`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
