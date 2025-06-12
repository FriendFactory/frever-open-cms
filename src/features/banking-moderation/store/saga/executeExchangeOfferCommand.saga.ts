import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { postEntity, deleteEntity } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { EXCHANGE_OFFERS_URL } from "urls";
import { exchangeOfferExecuteComandAction } from "../actions";
import { loadExchangeOffers } from "./watch.ExchangeOffers.saga";

export function* executeExchangeOfferCommandSaga() {
    yield takeEvery(
        exchangeOfferExecuteComandAction.TYPE,
        function* (action: typeof exchangeOfferExecuteComandAction.typeOf.action) {
            const command = action.command;
            try {
                command.type === "post"
                    ? yield call(postEntity, action.stage, "in-app-purchase/exchange-offer", command.data)
                    : yield call(deleteEntity, action.stage, "in-app-purchase/exchange-offer", command.id);

                const urlMatch = EXCHANGE_OFFERS_URL.match(location, true);
                if (urlMatch.isMatched) yield spawn(loadExchangeOffers, urlMatch.params.stage, urlMatch.query || {});
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to ${command.type} exchange offer. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
