import { call, put } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import {
    cmsAdminAccessScopeListLoadedErrorAction,
    cmsAdminAccessScopeListLoadedOkAction,
    cmsAdminAccessScopeListLoadingAction
} from "../actions";
import { AdminAccessScope, getAdminAccessScopes } from "features/permission-moderation/services";

export function* loadAccessScopeListSaga(stage: string) {
    yield put(cmsAdminAccessScopeListLoadingAction({ stage }));
    try {
        const result: AdminAccessScope[] = yield call(getAdminAccessScopes, stage);

        yield put(cmsAdminAccessScopeListLoadedOkAction({ stage, result }));
    } catch (responseError) {
        yield put(
            cmsAdminAccessScopeListLoadedErrorAction({
                stage,
                error: (responseError as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load access-scope list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
