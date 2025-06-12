import React from "react";
import { Button } from "antd";

import { wardrobeBasePrices } from "features/search-assets/constants/wardrobeBasePrices";
import { WardrobeAsset } from "features/search-assets/services";
import { useExtraDataBundle } from "shared/hooks/useExtraData";

export interface SelectBasePriceContainerProps {
    value: WardrobeAsset;
    onSetBasePrice: ({ value, currencyType }: { value: number; currencyType: "hard" | "soft" }) => void;
}

export function SelectBasePriceContainer({ value, onSetBasePrice }: SelectBasePriceContainerProps) {
    const { bundle, loading } = useExtraDataBundle(["AssetTier", "WardrobeCategory", "WardrobeSubCategory"]);

    const category = bundle.WardrobeCategory?.data?.find((el) => el.id === value.wardrobeCategoryId)?.name;

    const subCategory = bundle.WardrobeSubCategory?.data?.find(
        (el) => el.id === value.wardrobeAndWardrobeSubCategory[0]?.wardrobeSubCategoryId
    )?.name;

    const defineCurrencyType = (assetTierId: number) => {
        const name = bundle.AssetTier?.data?.find((el) => el.id === assetTierId)?.name;

        return name?.startsWith("SC") ? "soft" : "hard";
    };

    const basePrice =
        category && subCategory && value.assetTierId
            ? getWardrobeBasePrice(category, subCategory, value.assetTierId)
            : null;

    const handleOnClick = () =>
        value?.assetTierId &&
        basePrice &&
        onSetBasePrice({ currencyType: defineCurrencyType(value?.assetTierId), value: basePrice });

    return (
        <Button block disabled={!basePrice} loading={loading} onClick={handleOnClick}>
            Set standard price
        </Button>
    );
}

export const getWardrobeBasePrice = (category: string, subCategory: string, assetTierId: number) =>
    wardrobeBasePrices
        .find((el) => el.category === category && el.subCategory === subCategory)
        ?.prices.find((el) => el.assetTierId === assetTierId)?.price ?? null;
