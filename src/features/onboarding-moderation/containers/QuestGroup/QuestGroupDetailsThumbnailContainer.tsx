import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";

import { onboardingEntityPageSelector } from "../../store/reducer/entitySelector";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { createCdnURLFromFiles } from "shared";
import { FileExtensions } from "config";
import { updateEntityListAction } from "features/onboarding-moderation/store/actions";
import { OnboardingQuestGroup } from "features/onboarding-moderation/services";

export interface QuestGroupDetailsThumbnailContainerProps {
    stage: string;
    id: number;
}

export function QuestGroupDetailsThumbnailContainer({ stage, id }: QuestGroupDetailsThumbnailContainerProps) {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(onboardingEntityPageSelector(stage, { id }, "questGroup"));

    if (!data && !loading) return null;

    const entity = data?.[0];
    const files = entity?.files;
    const imageUrl = files
        ? createCdnURLFromFiles({
              stage,
              id,
              resolution: "512x512",
              entityType: "OnboardingQuestGroup",
              files
          }) || "/assets/no-image.png"
        : "/assets/no-image.png";

    const handleUpdate = (entity?: OnboardingQuestGroup, thumbnail?: File) => {
        if (!entity) return;
        dispatch(
            updateEntityListAction({
                stage,
                entityType: "questGroup",
                entity,
                thumbnail
            })
        );
    };

    return (
        <Card title="Thumbnail" loading={!data && loading} style={{ height: "100%" }}>
            <ThumbnailCard
                handleUpdate={async (file) => handleUpdate(entity, file)}
                imageUrl={imageUrl}
                markers={files?.length ? [files[0].resolution, FileExtensions[files[0].extension]] : []}
            />
        </Card>
    );
}
