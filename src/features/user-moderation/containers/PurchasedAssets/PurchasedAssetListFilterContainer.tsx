import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { PurchasedAssetsQueryParams } from "features/user-moderation/services";
import { PurchasedAssetListFilter } from "features/user-moderation/components/PurchasedAssets/PurchasedAssetListFilter";

export interface PurchasedAssetListFilterContainerProps {
    url: UrlPath<{ stage: string; id: number }, PurchasedAssetsQueryParams>;
}

export function PurchasedAssetListFilterContainer({ url }: PurchasedAssetListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnChange = (params: PurchasedAssetsQueryParams) => {
        const newUrl = url.replace(location, {}, toAssetUrlValues(params));
        if (newUrl) history.replace(newUrl);
    };

    return (
        <PurchasedAssetListFilter values={toAssetFilterFormValues(urlMatch.query)} handleOnChange={handleOnChange} />
    );
}

export const toAssetFilterFormValues = (params: any) => ({
    ...params
});

export const toAssetUrlValues = (form: any) => ({
    ...form,
    assetType: form?.assetType?.length ? form.assetType : undefined,
    skip: undefined
});
