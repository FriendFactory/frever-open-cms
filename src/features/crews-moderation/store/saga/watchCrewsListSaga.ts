import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";
import dayjs from "dayjs";

import { Crew, CrewListQueryParams, getCrewList } from "features/crews-moderation/services";
import { ODATA_DATE_FORMAT, ResultWithCount } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";
import { CREWS_LIST_PAGE_URL } from "urls";
import { crewsListLoadedErrorAction, crewsListLoadedOkAction, crewsListLoadingAction } from "../actions";
import { UnitTimeType } from "features/crews-moderation/components/CrewFilterForm";
import { getCrewListByMessages } from "features/crews-moderation/services/getCrewListByMessages";

export function* watchCrewsListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREWS_LIST_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadCrewsList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadCrewsList(stage: string, params: CrewListQueryParams) {
    try {
        yield put(crewsListLoadingAction({ stage, params }));

        let result: ResultWithCount<Crew> | undefined;
        if (params.unitTime && params.messagesTime) {
            const startDate = dayjs
                .utc(params.messagesTime)
                .startOf(params.unitTime as UnitTimeType)
                .format(ODATA_DATE_FORMAT);
            const endDate = dayjs
                .utc(params.messagesTime)
                .endOf(params.unitTime as UnitTimeType)
                .format(ODATA_DATE_FORMAT);

            result = yield call(getCrewListByMessages, stage, {
                startDate,
                endDate,
                skip: params.skip,
                take: params.take
            });
        } else {
            result = yield call(getCrewList, stage, params);
        }

        if (result) {
            yield put(crewsListLoadedOkAction({ stage, params, result }));
        } else {
            throw new Error("Internal crewsListWorker error");
        }
    } catch (e) {
        yield put(
            crewsListLoadedErrorAction({ stage, params, error: `Failed to load crews list. ${(e as Error).message}` })
        );
    }
}
