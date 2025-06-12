import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { AssetForm, SetLocationOrganization, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";

export function SetLocationFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "SetLocation", id));

    const extra = useExtraDataBundle([
        "Readiness",
        "SetLocationTemplate",
        "Weather",
        "GeoReference",
        "VFXType",
        "SetLocationCategory",
        "SetLocationSubcategory",
        "SetLocationMood",
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
            loading={(!info.data && info.loading) || extra.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            informationSection={
                info.data && <CommonFormItems name="name" readinessList={extra.bundle["Readiness"]?.data ?? []} />
            }
            organizationSection={
                info.data && <SetLocationOrganization stage={stage} data={info.data} bundleData={extra.bundle} />
            }
        />
    );
}
