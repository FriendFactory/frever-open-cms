import React from "react";

import { AssetOfferByAssetResult } from "features/search-assets/store/reducer/assetOffer/assetOfferByAsset.reducer";
import { CurrencyPrice } from "shared/components/CurrencyPrice";

export interface AssetPriceProps {
    assetOffer?: AssetOfferByAssetResult;
    price?: { softCurrencyPrice: number | null; hardCurrencyPrice: number | null };
}

export const AssetPrice = ({ assetOffer, price }: AssetPriceProps) => {
    if (price) return getCurrencyPrice(price.softCurrencyPrice, price.hardCurrencyPrice);

    if (!assetOffer) return <>None</>;
    if (assetOffer.error) return <>Error</>;
    if (!assetOffer.data) return assetOffer.loading ? <>...</> : <>None</>;

    const { softCurrencyPrice, hardCurrencyPrice } = assetOffer.data.assetOffer;
    return getCurrencyPrice(softCurrencyPrice, hardCurrencyPrice);
};

const getCurrencyPrice = (softCurrencyPrice: number | null, hardCurrencyPrice: number | null) => {
    if (softCurrencyPrice !== null) return <CurrencyPrice type="soft" value={softCurrencyPrice} />;
    if (hardCurrencyPrice !== null) return <CurrencyPrice type="hard" value={hardCurrencyPrice} />;
    return <>None</>;
};
