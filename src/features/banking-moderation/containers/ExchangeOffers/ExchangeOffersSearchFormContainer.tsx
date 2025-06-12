import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { EXCHANGE_OFFERS_URL } from "urls";
import { ExchangeOffersSearchForm } from "features/banking-moderation/components/ExchangeOffersSearchForm";
import { ExchangeOfferQueryParams } from "features/banking-moderation/services";

export function ExchangeOffersSearchFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = EXCHANGE_OFFERS_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnChange = useCallback(
        (values: ExchangeOfferQueryParams) => {
            const newUrl = EXCHANGE_OFFERS_URL.replace(location, {}, { ...values, skip: 0 });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    return <ExchangeOffersSearchForm values={urlMatch.query || {}} onChange={handleOnChange} />;
}
