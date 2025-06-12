import { ThumbnailFile } from "shared";

export interface ExchangeOffer {
    id: number;
    title: string;
    isEnabled: boolean;
    hardCurrencyRequired: number;
    softCurrencyGiven: number;
    sortOrder: number;
}

export interface InAppProduct {
    id: number;
    title: string;
    description: string | null;
    appStoreProductRef: string;
    playMarketProductRef: string;
    isActive: boolean;
    isSeasonPass: boolean;
    inAppProductPriceTierId: number;
    sortOrder: number;
    files?: ThumbnailFile[];
    publicationDate: string | null;
    depublicationDate: string | null;
    productDetails?: InAppProductDetails[];
}

export interface InAppProductDetails {
    id: number;
    inAppProductId: number;
    assetId: number | null;
    assetType: number | null;
    hardCurrency: number | null;
    softCurrency: number | null;
    sortOrder: number;
    title: string;
    description: string | null;
    isActive: boolean;
    uniqueOfferGroup: number;
    files: ThumbnailFile[];
}

export interface InAppPriceTier {
    id: number;
    title: string;
    appStoreProductRef: string;
    playMarketProductRef: string;
    refPriceUsdCents: number;
}
