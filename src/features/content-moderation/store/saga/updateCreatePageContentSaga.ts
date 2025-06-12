import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { transformCreatePageRowContent } from "features/content-moderation/helpers";
import { CreatePageRow, CreatePageRowDto, postCreatePageRow } from "features/content-moderation/services";
import { CreatePageRowContentActionType, updateCreatePageRowContentAction } from "../actions";
import { loadCreatePageRows } from "./watchCreatePageListSaga";

const UPDATE_CREATE_PAGE_CONTENT = "UPDATE_CREATE_PAGE_CONTENT";

export function* updateCreatePageContentSaga() {
    yield takeEvery(
        updateCreatePageRowContentAction.TYPE,
        function* (action: typeof updateCreatePageRowContentAction.typeOf.action) {
            try {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Pending...`,
                        messageStyle: "loading",
                        duration: 0,
                        key: UPDATE_CREATE_PAGE_CONTENT
                    })
                );

                const itemToUpdate = handleCreatePageContentList(action.item, action.targetContentIds, action.action);

                yield call(postCreatePageRow, action.stage, itemToUpdate);

                yield spawn(loadCreatePageRows, action.stage, { id: itemToUpdate.id });

                yield put(
                    addPopUpMessageAction({
                        messageText: `Updated CreatePageRow (${action.item.title}) content.`,
                        messageStyle: "success",
                        key: UPDATE_CREATE_PAGE_CONTENT
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        messageText: `Failed to update CreatePageRow(${action.item.title}) content. ${
                            (e as Error).message
                        }`,
                        key: UPDATE_CREATE_PAGE_CONTENT
                    })
                );
            }
        }
    );
}

export const handleCreatePageContentList = (
    item: CreatePageRow,
    newContentIds: number[],
    action: CreatePageRowContentActionType
): CreatePageRowDto => {
    const sourceContentIds = item.content.map((val) => val.id);
    if (action === "Delete") {
        return {
            ...transformCreatePageRowContent(item),
            contentIds: sourceContentIds.filter(
                (sourceContentId) => !newContentIds.some((newContentId) => sourceContentId === newContentId)
            )
        };
    }

    const updatedContent = Array.from(new Set([...sourceContentIds, ...newContentIds]));

    return { ...transformCreatePageRowContent(item), contentIds: updatedContent };
};
