import { all, call, delay, put, race, take, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import {
    runBackgroundAIPreviewAction,
    backgroundAIPreviewResponseAction,
    backgroundAIPreviewErrorAction,
    closeBackgroundAIPreviewAction
} from "../../actions/BackgroundAI";
import {
    getReplicate,
    GetReplicateResponse,
    GetReplicateResponseWithParams,
    postReplicate,
    PostReplicateResponse
} from "features/vme-backgrounds/services";
import { ReplicateInputType } from "features/vme-backgrounds/helpers";

const REQUEST_DELAY_MS = 3500;

export function* watchBackgroundAIPreviewSaga() {
    yield takeEvery(
        runBackgroundAIPreviewAction.TYPE,
        function* (action: typeof runBackgroundAIPreviewAction.typeOf.action) {
            yield race({
                task: call(backgroundAIPreviewSagaWorker, action),
                cancel: take(closeBackgroundAIPreviewAction.TYPE)
            });
        }
    );
}

function* backgroundAIPreviewSagaWorker(action: typeof runBackgroundAIPreviewAction.typeOf.action) {
    const { stage, replicateInput } = action;
    try {
        const replicatedInput: PostReplicateResponse[] = yield all(
            replicateInput.map((payload: ReplicateInputType) => call(postReplicate, stage, payload))
        );

        const callAllReplicate = replicatedInput.map((replicateData) => call(fetchUntilReady, stage, replicateData));

        const replicatedOutput: GetReplicateResponseWithParams[][] = yield all(callAllReplicate);

        yield put(
            backgroundAIPreviewResponseAction({
                stage,
                replicateOutput: replicatedOutput.flat()
            })
        );
    } catch (responseError) {
        yield put(
            backgroundAIPreviewErrorAction({
                stage,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to generate AI Background.${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

function* fetchUntilReady(stage: string, replicateData: PostReplicateResponse) {
    const result: GetReplicateResponseWithParams[] = [];
    while (true) {
        const response: GetReplicateResponse = yield call(getReplicate, stage, replicateData.predictionId);

        if (response.isReady || response.errorMessage) {
            result.push({ ...response, params: replicateData.params });
            break;
        }
        yield delay(REQUEST_DELAY_MS);
    }
    return result;
}
