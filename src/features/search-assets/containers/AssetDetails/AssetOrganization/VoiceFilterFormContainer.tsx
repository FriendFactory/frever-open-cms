import React from "react";
import { useSelector } from "react-redux";

import { AssetForm, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";
import { VoiceFilterOrganization } from "features/search-assets/components/AssetDetails/AssetOrganization/VoiceFilterOrganization";

export function VoiceFilterFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "VoiceFilter", id));
    const extraData = useExtraDataBundle(["Readiness", "VoiceFilterCategory", "UserLevel", "Race/moderation"]);
    return (
        <AssetForm
            initialValues={{ ...info.data, compatibleRaceIds: info.data?.compatibleRaceIds ?? undefined }}
            loading={(!info.data && info.loading) || extraData.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            informationSection={
                info.data && <CommonFormItems name="name" readinessList={extraData.bundle["Readiness"]?.data ?? []} />
            }
            organizationSection={
                info.data && <VoiceFilterOrganization stage={stage} data={info.data} bundleData={extraData.bundle} />
            }
        />
    );
}
