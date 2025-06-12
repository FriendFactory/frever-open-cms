import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { exchangeOffersLoadingAction, exchangeOffersLoadedOkAction, exchangeOffersLoadedErrorAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { getExchangeOffers, ExchangeOffer, ExchangeOfferQueryParams } from "features/banking-moderation/services";
import { EXCHANGE_OFFERS_URL } from "urls";
import { ResultWithCount } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchExchangeOffersSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EXCHANGE_OFFERS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Banking");
        if (!hasAccess) return;

        yield spawn(loadExchangeOffers, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadExchangeOffers(stage: string, params: ExchangeOfferQueryParams) {
    try {
        yield put(exchangeOffersLoadingAction({ stage, params }));

        const result: ResultWithCount<ExchangeOffer> = yield call(getExchangeOffers, stage, params);

        yield put(
            exchangeOffersLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (e) {
        yield put(
            exchangeOffersLoadedErrorAction({
                error: (e as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load exchange offers. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
