import { call, put, race, take, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { executeMigration, MigrationResponse } from "../../services";
import {
    runAssetMigrationAction,
    assetMigrationResponseAction,
    assetMigrationErrorAction,
    closeMigration
} from "../actions";

function* AssetsMigrationSagaWorker(action: typeof runAssetMigrationAction.typeOf.action) {
    const { params, assetList } = action;
    try {
        const result: MigrationResponse[] = [];
        for (const id of assetList) {
            result.push(
                yield call(executeMigration, params.operation, params.assetType, params.fromStage, params.toStage, id)
            );

            if (result.length === assetList.length) break;
        }

        yield put(
            assetMigrationResponseAction({
                params,
                assetList,
                responses: result
            })
        );
    } catch (responseError) {
        yield put(
            assetMigrationErrorAction({
                params,
                assetList,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to migrate the Asset to the ${params.toStage}. ${(
                    responseError as Error
                ).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

export function* watchAssetsMigrationSaga() {
    yield takeEvery(runAssetMigrationAction.TYPE, function* (action: typeof runAssetMigrationAction.typeOf.action) {
        yield race({
            task: call(AssetsMigrationSagaWorker, action),
            cancel: take(closeMigration.TYPE)
        });
    });
}
