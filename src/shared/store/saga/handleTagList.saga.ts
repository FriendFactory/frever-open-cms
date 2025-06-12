import { all } from "redux-saga/effects";

import { createEntitySaga } from "./watch.CreateEntity.saga";

export function* handleTagList(stage: string, tags: Array<string | number>) {
    const result: Array<number | undefined> = yield all(
        tags.map(function* (tag) {
            if (isNaN(Number(tag))) {
                try {
                    const resultTag = yield* createEntitySaga(stage, "Tag", { name: tag as string, categoryId: 1 });
                    return resultTag.id;
                } catch (e) {
                    return;
                }
            }
            return tag;
        })
    );

    return result.filter(Boolean) as number[];
}
