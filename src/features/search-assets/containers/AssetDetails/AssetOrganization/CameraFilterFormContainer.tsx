import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { AssetForm, CameraFilterOrganization, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";

export function CameraFilterFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "CameraFilter", id));
    const extraData = useExtraDataBundle([
        "Readiness",
        "CameraFilterCategory",
        "CameraFilterSubCategory",
        "ColorFilterCategory",
        "UserLevel",
        "AssetTier",
        "Race/moderation"
    ]);
    return (
        <AssetForm
            initialValues={{
                ...info.data,
                publicationDate: info.data?.publicationDate ? dayjs.utc(info.data?.publicationDate) : null,
                depublicationDate: info.data?.depublicationDate ? dayjs.utc(info.data?.depublicationDate) : null,
                compatibleRaceIds: info.data?.compatibleRaceIds ?? undefined
            }}
            loading={(!info.data && info.loading) || extraData.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            informationSection={
                info.data && <CommonFormItems name="name" readinessList={extraData.bundle["Readiness"]?.data ?? []} />
            }
            organizationSection={
                info.data && <CameraFilterOrganization stage={stage} data={info.data} bundleData={extraData.bundle} />
            }
        />
    );
}
