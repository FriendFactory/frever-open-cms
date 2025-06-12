import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { AssetForm, BodyAnimationOrganization, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";

export function BodyAnimFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "BodyAnimation", id));
    const extra = useExtraDataBundle([
        "Readiness",
        "BodyAnimationSpaceSize",
        "BodyAnimationCategory",
        "AnimationDirection",
        "UserLevel",
        "AssetTier",
        "BodyAnimationGroup",
        "MovementType",
        "Emotion",
        "Race/moderation"
    ]);

    return (
        <AssetForm
            initialValues={{
                ...info.data,
                publicationDate: info.data?.publicationDate ? dayjs.utc(info.data?.publicationDate) : null,
                depublicationDate: info.data?.depublicationDate ? dayjs.utc(info.data?.depublicationDate) : null,
                emotions: info.data?.emotions ?? undefined,
                compatibleRaceIds: info.data?.compatibleRaceIds ?? undefined
            }}
            loading={(!info.data && info.loading) || extra.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            informationSection={
                info.data && <CommonFormItems name="name" readinessList={extra.bundle["Readiness"]?.data ?? []} />
            }
            organizationSection={
                info.data && <BodyAnimationOrganization stage={stage} data={info.data} bundleData={extra.bundle} />
            }
        />
    );
}
