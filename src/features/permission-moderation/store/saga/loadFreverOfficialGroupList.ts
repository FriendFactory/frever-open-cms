import { call, put } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { FreverofficialGroup, getFreverofficialGroupList } from "features/permission-moderation/services";
import {
    cmsAdminFreverOfficialListLoadedErrorAction,
    cmsAdminFreverOfficialListLoadedOkAction,
    cmsAdminFreverOfficialListLoadingAction
} from "../actions";

export function* loadFreverOfficialGroupList(stage: string) {
    yield put(cmsAdminFreverOfficialListLoadingAction({ stage }));
    try {
        const result: FreverofficialGroup[] = yield call(getFreverofficialGroupList, stage);

        yield put(cmsAdminFreverOfficialListLoadedOkAction({ stage, result }));
    } catch (responseError) {
        yield put(
            cmsAdminFreverOfficialListLoadedErrorAction({
                stage,
                error: (responseError as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load frever official group list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
