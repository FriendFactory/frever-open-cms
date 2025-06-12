import React from "react";
import { useSelector } from "react-redux";

import { AssetForm, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { CameraAnimTemplOrganization } from "features/search-assets/components/AssetDetails/AssetOrganization/CameraAnimTemplOrganization";
import { useExtraDataBundle } from "shared/hooks/useExtraData";

export function CameraAnimTemplFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "CameraAnimationTemplate", id));
    const extraData = useExtraDataBundle(["Readiness", "CameraAnimationType", "CameraCategory"]);

    return (
        <AssetForm
            initialValues={info.data}
            loading={(!info.data && info.loading) || extraData.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            informationSection={
                info.data && (
                    <CommonFormItems name="displayName" readinessList={extraData.bundle["Readiness"]?.data ?? []} />
                )
            }
            organizationSection={
                info.data && (
                    <CameraAnimTemplOrganization stage={stage} data={info.data} bundleData={extraData.bundle} />
                )
            }
        />
    );
}
