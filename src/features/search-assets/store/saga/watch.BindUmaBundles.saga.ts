import { call, put, takeEvery } from "redux-saga/effects";

import { bindUmaBundlesAction, clearLinkerAction, umaBundlesByTIdLoadAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { editAssetDetails, umaBundleTypes } from "../../services";
import { UMA_BUNDLE_LINKER_URL } from "urls";

export function* watchBindUmaBundlesSaga() {
    yield takeEvery(bindUmaBundlesAction.TYPE, function* (action: typeof bindUmaBundlesAction.typeOf.action) {
        try {
            const baseBind = action.operation === "bind" ? action.versionBundleId : -action.versionBundleId;
            const baseBundleData = {
                id: action.baseBundleId,
                umaBundleAllDependencyDependsOnBundle: [
                    {
                        umaBundleId: baseBind
                    }
                ],
                umaBundleDirectDependencyDependsOnBundle: [
                    {
                        umaBundleId: baseBind
                    }
                ]
            };

            yield call(editAssetDetails, action.stage, "umaBundle", baseBundleData);

            yield put(
                addPopUpMessageAction({
                    messageText: "The bind action success",
                    messageStyle: "success"
                })
            );

            const urlMatch = UMA_BUNDLE_LINKER_URL.match(location, true);

            if (urlMatch.isMatched) {
                const { baseBunId, baseBunName, baseBunSkip, versionBunId, versionBunName, versionBunSkip } =
                    urlMatch.query ?? {};

                yield put(
                    umaBundlesByTIdLoadAction({
                        stage: urlMatch.params.stage,
                        umaBundleTypeId: umaBundleTypes.version,
                        params: { id: versionBunId, name: versionBunName, skip: versionBunSkip }
                    })
                );
                yield put(
                    umaBundlesByTIdLoadAction({
                        stage: urlMatch.params.stage,
                        umaBundleTypeId: umaBundleTypes.base,
                        params: { id: baseBunId, name: baseBunName, skip: baseBunSkip }
                    })
                );
            }

            yield put(clearLinkerAction({}));
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
