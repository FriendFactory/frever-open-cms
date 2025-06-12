import { all, call } from "redux-saga/effects";

import {
    AssetData,
    AssetDataNames,
    CharacterSpawnPosition,
    CharacterSpawnPositionSetLocation
} from "features/search-assets/services";
import { getSetLocationOfSpawnPosition } from "features/search-assets/services/getSetLocationOfSpawnPosition";

export function* expandSpawnPositionSaga(stage: string, assets: AssetData[AssetDataNames][]) {
    const result: CharacterSpawnPosition[] = yield all(
        assets.map(function* (el) {
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
    );
    return result;
}
