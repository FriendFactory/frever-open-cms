import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateTemplateAction, templatePageSelector } from "../../store";
import { useExtraData } from "shared/hooks/useExtraData";
import { TagsCard } from "shared";
import { TagsSelect } from "shared/components/TagsSelect";

export interface TemplateTagsContainerProps {
    stage: string;
    id: number;
}

export function TemplateTagsContainer({ stage, id }: TemplateTagsContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(templatePageSelector(stage, id));
    const tags = useExtraData({ stage, name: "Tag" });

    const handleOnChange = (tags: string[]) => {
        dispatch(updateTemplateAction({ stage, id, tags }));
    };

    return (
        <TagsCard stage={stage} loading={(!info.data && info.loading) || tags.loading}>
            <TagsSelect stage={stage} value={info.data?.tags} onChange={handleOnChange} />
        </TagsCard>
    );
}
