import { call, put, takeEvery } from "redux-saga/effects";

import { assetListHandleLoadAction, bodyAnimationLinkerAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { editAssetDetails } from "../../services";

export function* watchBodyAnimationLinkerSaga() {
    yield takeEvery(bodyAnimationLinkerAction.TYPE, function* (action: typeof bodyAnimationLinkerAction.typeOf.action) {
        try {
            yield call(editAssetDetails, action.stage, "BodyAnimation", {
                id: action.bodyAnimId,
                bodyAnimationAndCharacterSpawnPosition: action.data
            });

            yield put(
                addPopUpMessageAction({
                    messageText: "The bind action success",
                    messageStyle: "success"
                })
            );

            if (action.updateAfter.type === "lists") {
                yield put(
                    assetListHandleLoadAction({
                        stage: action.stage,
                        asset: "CharacterSpawnPosition",
                        params: {
                            skip: action.updateAfter.params?.charSpawnPosSkip,
                            search: action.updateAfter.params?.charSpawnPosSearch
                        },
                        expand: ["setLocationBundle", "bodyAnimationAndCharacterSpawnPosition"]
                    })
                );

                yield put(
                    assetListHandleLoadAction({
                        stage: action.stage,
                        asset: "BodyAnimation",
                        params: {
                            skip: action.updateAfter.params?.bodyAnimSkip,
                            search: action.updateAfter.params?.bodyAnimSearch
                        },
                        expand: ["bodyAnimationAndCharacterSpawnPosition"]
                    })
                );
            }

            if (action.updateAfter.type === "single") {
                yield put(
                    assetListHandleLoadAction({
                        stage: action.stage,
                        asset: "CharacterSpawnPosition",
                        params: { spawnPosBodyAnimId: action.bodyAnimId, take: 100 }
                    })
                );
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: "Something went wrong",
                    messageStyle: "error"
                })
            );
        }
    });
}
