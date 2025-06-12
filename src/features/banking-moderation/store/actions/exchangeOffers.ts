import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ExchangeOffer, ExchangeOfferQueryParams } from "features/banking-moderation/services";
import { ResultWithCount } from "shared";

export const exchangeOffersActionGroup = defineActionGroup<{
    stage: string;
    params: ExchangeOfferQueryParams;
}>("EXCHANGE OFFERS");

export const exchangeOffersLoadingAction = exchangeOffersActionGroup.defineAction("LOADING");

export const exchangeOffersLoadedOkAction = exchangeOffersActionGroup.defineAction<{
    result: ResultWithCount<ExchangeOffer>;
}>("LOADED OK");

export const exchangeOffersLoadedErrorAction = exchangeOffersActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const exchangeOfferExecuteComandAction = defineAction<{
    stage: string;
    command: { type: "post"; data: ExchangeOffer } | { type: "delete"; id: number };
}>("EXCHANGE OFFER EXECUTE COMMAND");
