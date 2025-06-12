import React from "react";
import { useSelector } from "react-redux";

import { AssetForm, SFXOrganization, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";

export function SFXFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "SFX", id));
    const extraData = useExtraDataBundle(["Readiness", "SFXCategory"]);

    return (
        <AssetForm
            initialValues={info.data}
            loading={(!info.data && info.loading) || extraData.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            organizationSection={info.data && <SFXOrganization data={info.data} bundleData={extraData.bundle} />}
            informationSection={
                info.data && <CommonFormItems name="name" readinessList={extraData.bundle.Readiness?.data ?? []} />
            }
        />
    );
}
