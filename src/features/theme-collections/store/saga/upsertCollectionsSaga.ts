import { all, call, put, takeEvery } from "redux-saga/effects";

import { upsertCollectionsAction, upsertCollectionsOkAction } from "../actions";
import { ThemeCollection, ThemeCollectionDto } from "features/theme-collections/services";
import { postThemeCollection } from "features/theme-collections/services/postThemeCollection";
import { addPopUpMessageAction } from "shared/store";

const POP_UP_KEY = "THEME COLLECTIONS UPDATE";

export function* upsertCollectionsSaga() {
    yield takeEvery(upsertCollectionsAction.TYPE, function* (action: typeof upsertCollectionsAction.typeOf.action) {
        const list = [...action.items];

        yield put(
            addPopUpMessageAction({
                messageStyle: "loading",
                messageText: "Pending...",
                key: POP_UP_KEY,
                duration: 0
            })
        );

        const result: ThemeCollection[] = [];
        const failed: ThemeCollection[] = [];

        for (let i = 0; i < list.length; i += 4) {
            const slice = list.slice(i, i + 4);

            yield all(
                slice.map(function* (data) {
                    try {
                        const newItem: ThemeCollection = yield call(
                            postThemeCollection,
                            action.stage,
                            transformThemeCollection(data)
                        );

                        result.push(newItem);
                    } catch (e) {
                        failed.push(data);
                    }
                })
            );
        }

        yield put(
            addPopUpMessageAction({
                messageStyle: failed.length ? "info" : "success",
                messageText: failed.length
                    ? `Some items weren't updated. (${failed.map((el) => el.name).join(" ,")})`
                    : "Sorting changes saved",
                key: POP_UP_KEY,
                duration: 2
            })
        );

        yield put(
            upsertCollectionsOkAction({
                stage: action.stage,
                data: result
            })
        );
    });
}

export const transformThemeCollection = (item: Partial<ThemeCollection>): ThemeCollectionDto => {
    const { wardrobes, ...result } = item;

    return {
        ...result,
        wardrobeIds: wardrobes?.map((el) => el.id) || []
    };
};
