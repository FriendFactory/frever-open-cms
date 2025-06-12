import { call, put, takeEvery } from "redux-saga/effects";

import { Template } from "features/video-templates/services";
import { TEMPLATE_DETAILS_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { templateLoadedOkAction } from "../../../video-templates/store/actions";
import { postEntity } from "shared";
import { createTemplateAction } from "../actions";

export function* watchCreateTemplateSaga() {
    yield takeEvery(createTemplateAction.TYPE, function* (action: typeof createTemplateAction.typeOf.action) {
        try {
            const result: Template = yield call(postEntity, action.stage, "template", action.data);

            yield put(templateLoadedOkAction({ stage: action.stage, id: result.id, result }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Template created.",
                    messageStyle: "success",
                    link: TEMPLATE_DETAILS_URL.format({ stage: action.stage, id: result.id })
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to create the template. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
