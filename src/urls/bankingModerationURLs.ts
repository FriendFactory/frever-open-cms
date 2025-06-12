import { BASE_PAGE_URL } from "urls";
import { InAppProductsQueryParams, ExchangeOfferQueryParams } from "features/banking-moderation/services";

export const BANKING_BASE_URL = BASE_PAGE_URL.createChildPath("banking");

export const EXCHANGE_OFFERS_URL = BANKING_BASE_URL.createChildPath<{}, ExchangeOfferQueryParams>("exchange-offers");

export const IN_APP_PRODUCT_BASE_URL = BANKING_BASE_URL.createChildPath("in-app-products");

export const IN_APP_PRODUCT_LIST_URL = IN_APP_PRODUCT_BASE_URL.createChildPath<{}, InAppProductsQueryParams>("list");

export const IN_APP_PRODUCT_INFO_URL = IN_APP_PRODUCT_BASE_URL.createChildPath<{ id: number }, {}>("info/:id");

export const IN_APP_PRICE_TIERS_URL = BANKING_BASE_URL.createChildPath<{}, InAppProductsQueryParams>(
    "in-app-price-tiers"
);

export const EXCHANGE_OFFERS_BASE_PAGE_SIZE = 50;
export const IN_APP_PRODUCTS_BASE_PAGE_SIZE = 50;
