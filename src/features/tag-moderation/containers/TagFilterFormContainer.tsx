import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { TagFilterForm } from "features/tag-moderation/components/TagFilterForm";
import { useExtraData } from "shared/hooks/useExtraData";
import { LoadingContainer } from "shared";

export interface TagFilterParams {
    id?: number;
    name?: string;
    categoryId?: number;
    skip?: number;
}

export interface TagFilterFormContainerProps {
    url: UrlPath<{ stage: string }, TagFilterParams>;
}

export function TagFilterFormContainer({ url }: TagFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const stage = urlMatch.params.stage;
    const params = urlMatch.query ?? {};
    const categories = useExtraData({ stage, name: "TagCategory" });

    const handleOnChange = (params: TagFilterParams) => {
        const newUrl = url.replace(
            location,
            {},
            {
                ...params,
                skip: 0
            }
        );

        if (newUrl) history.replace(newUrl);
    };

    if (categories.loading) return <LoadingContainer loading />;

    return <TagFilterForm values={params} categories={categories.data ?? []} handleOnChange={handleOnChange} />;
}
