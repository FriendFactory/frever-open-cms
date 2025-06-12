import React from "react";
import { Route } from "react-router";

import { InAppPriceTiersPage, InAppProductInfoPage, InAppProductListPage, ExchangeOffersPage } from "pages";
import { EXCHANGE_OFFERS_URL, IN_APP_PRICE_TIERS_URL, IN_APP_PRODUCT_INFO_URL, IN_APP_PRODUCT_LIST_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const BankingModerationRoutes = [
    <Route
        key="in-app-price-tiers"
        path={IN_APP_PRICE_TIERS_URL.urlTemplate}
        render={renderProtectedPageElement("Banking", InAppPriceTiersPage)}
    />,
    <Route
        key="in-app-product-info"
        path={IN_APP_PRODUCT_INFO_URL.urlTemplate}
        render={renderProtectedPageElement("Banking", InAppProductInfoPage)}
    />,
    <Route
        key="in-app-product-list"
        path={IN_APP_PRODUCT_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("Banking", InAppProductListPage)}
    />,
    <Route
        key="exchange-offers"
        path={EXCHANGE_OFFERS_URL.urlTemplate}
        render={renderProtectedPageElement("Banking", ExchangeOffersPage)}
    />
];
