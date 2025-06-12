export interface InAppPurchaseOrder {
    id: string;
    createdTime: string | null;
    groupId: number;
    inAppProductOfferPayload: InAppProductOrderPayload;

    errorCode: string | null;
    isPending: boolean;
    completedTime: string | null;
    
    platform: string | null;
    premiumPassPurchase: boolean;
    refHardCurrencyAmount: number | null;
    refPriceUsdCents: number | null;
    seasonId: number | null;
    storeOrderIdentifier: string | null;
    wasRefund: boolean;
}

export interface InAppProductOrderPayload {
    inAppProductId: number;
    inAppProductDetailIds: number[];
}
