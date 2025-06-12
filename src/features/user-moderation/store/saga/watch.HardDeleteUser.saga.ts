import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { User, getUserList, hardDeleteUser } from "../../services";
import { hardDeleteUserAction, replaceUserInCurrentPageAction } from "../actions";
import { DEFAULT_USER_LIST_PAGE_SIZE, USER_DETAILS_INFO_URL, USER_MODERATION_LIST_URL } from "urls";

export function* watchHardDeleteUserSaga() {
    yield takeEvery(hardDeleteUserAction.TYPE, function* (action: typeof hardDeleteUserAction.typeOf.action) {
        try {
            yield call(hardDeleteUser, action.stage, action.user.mainGroupId);

            const detailsPageUrlMatch = USER_DETAILS_INFO_URL.match(location, true);

            if (detailsPageUrlMatch.isMatched) {
                history.back();
            }

            const listPageUrlMatch = USER_MODERATION_LIST_URL.match(location, true);
            if (listPageUrlMatch.isMatched) {
                const query = listPageUrlMatch.query;
                const skip = (query?.skip ?? 0) + DEFAULT_USER_LIST_PAGE_SIZE - 1;

                const result: User[] = yield call(getUserList, listPageUrlMatch.params.stage, {
                    ...listPageUrlMatch.query,
                    take: 1,
                    skip
                });

                yield put(
                    replaceUserInCurrentPageAction({
                        stage: listPageUrlMatch.params.stage,
                        params: listPageUrlMatch.query || {},
                        oldUser: action.user,
                        newUser: result[0]
                    })
                );
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to hard-delete the user. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
