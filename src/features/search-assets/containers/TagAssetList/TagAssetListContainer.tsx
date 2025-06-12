import React from "react";
import { UrlPath } from "rd-url-utils";
import { useSelector } from "react-redux";

import { useExtraData } from "shared";
import { tagAssetListPageSelector } from "features/search-assets";
import { TagAssetListFilterParams } from "./TagAssetListFilterFormContainer";
import { TagAssetList } from "features/search-assets/components/TagAssetList/TagAssetList";

export interface TagAssetListContainerProps {
    url: UrlPath<{ stage: string; id: number }, TagAssetListFilterParams>;
}

export function TagAssetListContainer({ url }: TagAssetListContainerProps) {
    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage, id: tagId } = urlMatch.params;
    const params = { tagId, ...urlMatch.query };

    const info = useSelector(tagAssetListPageSelector(stage, params));
    const readinessList = useExtraData({ stage, name: "Readiness" });

    return (
        <TagAssetList
            loading={(!info.data?.length && info.loading) || readinessList.loading}
            data={info.data ?? []}
            stage={stage}
            readinessList={readinessList.data ?? []}
        />
    );
}
