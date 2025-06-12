import { call, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";

import { TEMPLATE_LIST_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { updateSortingOrderAction } from "../actions";
import { updateTemplateSortOrders } from "features/video-templates/services";

export function* watchUpdateSortingOrderSaga() {
    yield takeEvery(updateSortingOrderAction.TYPE, function* (action: typeof updateSortingOrderAction.typeOf.action) {
        try {
            yield call(updateTemplateSortOrders, action.stage, action.data);

            yield put(
                addPopUpMessageAction({
                    messageText: "Success! New sorting orders saved",
                    messageStyle: "success"
                })
            );

            yield put(push(TEMPLATE_LIST_URL.format({ stage: action.stage })));
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed. New sorting orders were not saved. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
