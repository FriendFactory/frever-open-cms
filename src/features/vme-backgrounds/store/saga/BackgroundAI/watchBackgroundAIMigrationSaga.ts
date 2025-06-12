import { call, put, race, take, takeEvery } from "redux-saga/effects";

import { executeMigration, MigrationResponse } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";

import {
    runBackgroundAIMigrationAction,
    backgroundAIMigrationResponseAction,
    backgroundAIMigrationErrorAction,
    closeBackgroundAIMigrationAction
} from "../../actions/BackgroundAI";

function* backgroundAIMigrationSagaWorker(action: typeof runBackgroundAIMigrationAction.typeOf.action) {
    const { params, backgroundsIds } = action;
    try {
        const result: MigrationResponse[] = [];
        for (const id of backgroundsIds) {
            result.push(
                yield call(executeMigration, params.operation, params.entityType, params.fromStage, params.toStage, id)
            );

            if (result.length === backgroundsIds.length) break;
        }

        yield put(
            backgroundAIMigrationResponseAction({
                params,
                backgroundsIds,
                responses: result
            })
        );
    } catch (responseError) {
        yield put(
            backgroundAIMigrationErrorAction({
                params,
                backgroundsIds,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to migrate the AI Background to the ${params.toStage}. ${(
                    responseError as Error
                ).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

export function* watchBackgroundAIMigrationSaga() {
    yield takeEvery(
        runBackgroundAIMigrationAction.TYPE,
        function* (action: typeof runBackgroundAIMigrationAction.typeOf.action) {
            yield race({
                task: call(backgroundAIMigrationSagaWorker, action),
                cancel: take(closeBackgroundAIMigrationAction.TYPE)
            });
        }
    );
}
