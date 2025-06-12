import { all, call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { updateTemplateInfo, Template } from "../../services";
import { deleteTemplatesAction, deleteTemplatesFinishedOkAction } from "../actions";

export function* watchDeleteTemplatesSaga() {
    yield takeEvery(deleteTemplatesAction.TYPE, function* (action: typeof deleteTemplatesAction.typeOf.action) {
        const result: Template[] = yield all(
            action.ids.map(function* (id: number) {
                try {
                    const updatedTemplate: Template = yield call(updateTemplateInfo, action.stage, id, {
                        isDeleted: action.command === "delete"
                    });

                    return updatedTemplate;
                } catch (error) {
                    yield put(
                        addPopUpMessageAction({
                            messageText: `An error occurred while attempting to delete the template with ID ${id}. ${
                                (error as Error).message
                            }`,
                            messageStyle: "error"
                        })
                    );
                    return;
                }
            })
        );

        yield put(
            deleteTemplatesFinishedOkAction({
                stage: action.stage,
                result: result.filter(Boolean)
            })
        );
    });
}
