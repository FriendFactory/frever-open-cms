import { FilterForm, FilterFormFields } from "features/search-assets/components";
import { assetReadinessFilter } from "features/search-assets/constants/assetExtraFilters";
import { useExtraData } from "shared";
import { toAssetFilterFormValues, toAssetUrlValues } from "../AssetList/FilterFormContainer";
import { AssetListParams } from "features/search-assets/services";
import React from "react";

interface EmotionAssetListFilterContainerProps {
    stage: string;
    baseParams: AssetListParams;
    onFinish: (params: AssetListParams) => void;
}

export function EmotionAssetListFilterContainer({ stage, baseParams, onFinish }: EmotionAssetListFilterContainerProps) {
    const readiness = useExtraData({ stage, name: "Readiness" });

    const extraSelectFilters = {
        ...assetReadinessFilter,
        options: readiness.data?.map((category) => ({
            label: category.name,
            value: category.id.toString()
        }))
    };

    const handleOnFinish = (form: FilterFormFields) => {
        const newParams = toAssetUrlValues(form);

        onFinish(newParams);
    };

    const handleOnChangeExtraFilter = (fieldName: string) => (value: string | string[]) =>
        handleOnFinish({ [fieldName]: value });

    return (
        <FilterForm
            disabled={readiness.loading}
            onFinish={handleOnFinish}
            initialValues={toAssetFilterFormValues(baseParams)}
            onChangeExtraFilter={handleOnChangeExtraFilter}
            extraFilters={[extraSelectFilters]}
        />
    );
}
