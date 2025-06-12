import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import {
    createTemplateSortingModeQuery,
    SortOrderModeParams
} from "features/video-templates/services/helpers/createTemplateSortingModeQuery";
import { call, put, takeEvery } from "redux-saga/effects";
import { ResultWithCount } from "shared";

import { addPopUpMessageAction } from "shared/store";
import { getTemplateList, SortOrderTypes, Template } from "../../services";
import { TEMPLATE_SORTING_MODE_URL } from "urls";
import {
    templateSortingModeLoadedOkAction,
    templateSortingModeLoadedErrorAction,
    templateSortingModeLoadAction,
    templateSortingModeLoadingAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchTemplateSortingModeSaga() {
    yield takeEvery(
        templateSortingModeLoadAction.TYPE,
        function* (action: typeof templateSortingModeLoadAction.typeOf.action) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;

            yield loadTemplateSortingModeSaga(action.stage, action.sortOrderType, action.params);
        }
    );

    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = TEMPLATE_SORTING_MODE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        yield loadTemplateSortingModeSaga(urlMatch.params.stage, urlMatch.params.sortOrderType, urlMatch.query || {});
    });
}

export function* loadTemplateSortingModeSaga(
    stage: string,
    sortOrderType: SortOrderTypes,
    params: SortOrderModeParams
) {
    const query = createTemplateSortingModeQuery(sortOrderType, params);

    try {
        yield put(templateSortingModeLoadingAction({}));

        const result: ResultWithCount<Template> = yield call(getTemplateList, stage, query);

        yield put(
            templateSortingModeLoadedOkAction({
                stage,
                result: result.data,
                restLoadedCount: params.byUsageCount ? result.data.length : 0,
                withValueLoadedCount: !params.byUsageCount ? result.data.length : 0,
                restCount: params.byUsageCount ? result.count : undefined,
                withValueCount: !params.byUsageCount ? result.count : undefined
            })
        );

        if (!params.byUsageCount && result.count === 0) {
            yield put(
                templateSortingModeLoadAction({ stage, sortOrderType, params: { ...params, byUsageCount: true } })
            );
        }
    } catch (responseError) {
        yield put(
            templateSortingModeLoadedErrorAction({
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the template list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
