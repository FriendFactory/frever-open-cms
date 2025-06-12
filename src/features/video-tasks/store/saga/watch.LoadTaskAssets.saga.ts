import { all, call, put, select, takeEvery } from "redux-saga/effects";

import {
    AssetData,
    AssetDataNames,
    CharacterSpawnPositionSetLocation,
    getAssetList
} from "features/search-assets/services";
import { getSetLocationOfSpawnPosition } from "features/search-assets/services/getSetLocationOfSpawnPosition";
import { assetKeySelector } from "features/search-assets/store";
import { loadTaskAssetsAction, taskAssetsLoadedOkAction } from "../actions";
import { TaskAssetTypeName } from "features/video-tasks/services";
import { AppState } from "app-state";

export function* watchLoadTaskAssetsSaga() {
    yield takeEvery(loadTaskAssetsAction.TYPE, function* (action: typeof loadTaskAssetsAction.typeOf.action) {
        const { stage, task } = action;

        // We load CharacterSpawPositions instead of SetLocation
        const normalizedList = task.assets
            ?.filter((el) => el.assetType !== "SetLocation")
            .reduce((acc: { [key: string]: number[] }, el) => {
                acc[el.assetType] ? acc[el.assetType].push(el.assetId) : (acc[el.assetType] = [el.assetId]);
                return acc;
            }, {});

        if (task.spawnPositions && normalizedList) {
            normalizedList.CharacterSpawnPosition = task.spawnPositions.map((el) => el.characterSpawnPositionId);
        }

        const appState: AppState = yield select();

        const result: { [key in TaskAssetTypeName]?: AssetData[AssetDataNames][] } = {};
        for (let assetType in normalizedList) {
            const search = normalizedList[assetType]
                .filter((el) => !appState.asset.entities[assetKeySelector(stage, assetType as AssetDataNames, el)])
                .join(", ");

            if (search) {
                try {
                    const assetResult: AssetData[TaskAssetTypeName][] = yield call(
                        getAssetList,
                        stage,
                        assetType as AssetDataNames,
                        { orderBy: "id", search, take: normalizedList[assetType].length }
                    );

                    const response: AssetData[AssetDataNames][] =
                        assetType === "CharacterSpawnPosition"
                            ? yield all(
                                  assetResult.map(function* (el) {
                                      try {
                                          const response: CharacterSpawnPositionSetLocation = yield call(
                                              getSetLocationOfSpawnPosition,
                                              stage,
                                              el.id
                                          );

                                          return { ...el, setLocation: response };
                                      } catch (e) {
                                          return el;
                                      }
                                  })
                              )
                            : assetResult;

                    result[assetType as TaskAssetTypeName] = response;
                } catch (e) {}
            }
        }

        if (Object.entries(result).length) {
            yield put(taskAssetsLoadedOkAction({ stage, assets: result }));
        }
    });
}
