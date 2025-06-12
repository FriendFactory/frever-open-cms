import React from "react";
import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";

import { AssetListParams } from "features/search-assets/services";
import { TagAssetListFilterForm } from "features/search-assets/components/TagAssetList/TagAssetListFilterForm";

export type TagAssetListFilterParams = AssetListParams & { assetType?: string[] };

export interface TagAssetListFilterFormContainerProps {
    url: UrlPath<{ stage: string; id: number }, TagAssetListFilterParams>;
}

export function TagAssetListFilterFormContainer({ url }: TagAssetListFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnChange = (params: TagAssetListFilterParams) => {
        const newUrl = url.replace(location, {}, toAssetUrlValues(params));
        if (newUrl) history.replace(newUrl);
    };

    return <TagAssetListFilterForm values={toAssetFilterFormValues(urlMatch.query)} handleOnChange={handleOnChange} />;
}

export const toAssetFilterFormValues = (params: any) => ({
    ...params,
    search: params?.search,
    searchFilter: params?.searchFilter ?? "contains",
    caseSensitive: params?.caseSensitive === "true"
});

export const toAssetUrlValues = (form: any) => ({
    ...form,
    search: form.search ? form.search : undefined,
    searchFilter: form.search ? form.searchFilter ?? "contains" : undefined,
    caseSensitive: form.search ? (form.caseSensitive ? "true" : "false") : undefined,
    assetType: form.assetType ? form.assetType : undefined,
    skip: undefined
});
