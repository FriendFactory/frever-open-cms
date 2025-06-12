import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { assetDetailsSelector, assetEditAction } from "../../store";
import { AssetTypes } from "config";
import { TagsCard } from "shared";
import { TagsSelect } from "shared/components/TagsSelect";

export interface AssetTagsContainerProps {
    url: UrlPath<{ stage: string; asset: AssetTypes; id: number }, {}>;
}

export function AssetTagsContainer({ url }: AssetTagsContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const { asset, stage, id } = urlMatch.params;

    if (asset === "CameraAnimationTemplate") return null;

    const info = useSelector(assetDetailsSelector(stage, asset, id));

    const handleOnChange = useCallback(
        (tags: string[]) => dispatch(assetEditAction({ stage, asset, data: { id, tags } })),
        [info.data]
    );

    return (
        <TagsCard stage={stage} loading={info.loading && !info.data?.tags}>
            <TagsSelect stage={stage} value={info.data?.tags} onChange={handleOnChange} />
        </TagsCard>
    );
}
