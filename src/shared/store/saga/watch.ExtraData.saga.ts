import { all, call, put, takeEvery } from "redux-saga/effects";

import { getExtraData } from "shared/services";
import { addPopUpMessageAction } from "shared/store";
import { ExtraDataType } from "shared/services/api";
import { extraDataLoadAction, extraDataLoadedAction, extraDataLoadingAction } from "..";

export function* watchExtraDataSaga() {
    yield takeEvery(extraDataLoadAction.TYPE, function* (action: typeof extraDataLoadAction.typeOf.action) {
        const { stage, entities } = action;

        yield put(extraDataLoadingAction({ stage, entities }));

        const result: typeof extraDataLoadedAction.typeOf.payload.result = yield all(
            entities.map(function* (name) {
                try {
                    const data: ExtraDataType<typeof name>[] = yield call(getExtraData, stage, name);

                    return { name, data };
                } catch (responseError) {
                    addPopUpMessageAction({
                        messageText: `Failed to load ${name}. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    });

                    return { name, error: responseError };
                }
            })
        );

        yield put(
            extraDataLoadedAction({
                stage,
                result
            })
        );
    });
}
