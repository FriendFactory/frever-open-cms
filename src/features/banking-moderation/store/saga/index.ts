import { all } from "redux-saga/effects";

import { executeExchangeOfferCommandSaga } from "./executeExchangeOfferCommand.saga";
import { watchExchangeOffersSaga } from "./watch.ExchangeOffers.saga";
import { watchInAppPriceTierPostSaga } from "./watch.InAppPriceTierPost.saga";
import { watchInAppPriceTiersSaga } from "./watch.InAppPriceTiers.saga";
import { watchInAppProductDetailsPostSaga } from "./watch.InAppProductDetailsPost.saga";
import { watchInAppProductInfoSaga } from "./watch.InAppProductInfo.saga";
import { watchInAppProductListSaga } from "./watch.InAppProductList.saga";
import { watchInAppProductPostSaga } from "./watch.InAppProductPost.saga";

export function* bankingSaga() {
    yield all([
        watchExchangeOffersSaga(),
        executeExchangeOfferCommandSaga(),
        watchInAppProductListSaga(),
        watchInAppProductInfoSaga(),
        watchInAppProductPostSaga(),
        watchInAppPriceTiersSaga(),
        watchInAppPriceTierPostSaga(),
        watchInAppProductDetailsPostSaga()
    ]);
}
