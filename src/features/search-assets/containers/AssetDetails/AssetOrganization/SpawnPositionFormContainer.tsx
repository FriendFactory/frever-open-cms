import React, { useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { AssetForm, LightSettings, SpawnPositionAdjustments } from "features/search-assets/components";
import { SpawnPositionInformation } from "features/search-assets/components/AssetDetails/AssetOrganization/SpawnPositionInformation";
import { AssetDataNames, Adjustments } from "features/search-assets/services";
import { assetDetailsSelector, assetEditAction, AssetInfoToUpdate } from "features/search-assets/store";
import { useExtraDataBundle } from "shared/hooks/useExtraData";
import { CommonFormContainerProps } from ".";

export function SpawnPositionFormContainer({ id, stage, onSubmit }: CommonFormContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(assetDetailsSelector(stage, "CharacterSpawnPosition", id), shallowEqual);
    const extraData = useExtraDataBundle([
        "BodyAnimationSpaceSize",
        "SpawnPositionSpaceSize",
        "MovementType",
        "Gender"
    ]);

    const updateLightSettings = useCallback(
        (data: AssetInfoToUpdate) =>
            dispatch(assetEditAction({ stage, asset: "LightSettings" as AssetDataNames, data })),
        [info.data]
    );

    const updateAdjustment = (index: number, sourceAdjustments: Adjustments[]) => (data: Adjustments) => {
        const newAdjustments = _.cloneDeep(sourceAdjustments);
        newAdjustments[index] = data;

        const updatedData = { id, adjustments: newAdjustments };

        dispatch(
            assetEditAction({
                stage,
                asset: "CharacterSpawnPosition",
                data: updatedData
            })
        );
    };

    const adjustments = info.data?.adjustments?.length ? info.data?.adjustments : initialAdjustments;

    return (
        <>
            <AssetForm
                loading={(!info.data && info.loading) || extraData.loading}
                initialValues={info.data}
                disabled={info.loading}
                onSubmit={onSubmit}
                informationSection={
                    info.data && (
                        <SpawnPositionInformation
                            bundleData={extraData.bundle}
                            unityGuid={info.data?.unityGuid ?? ""}
                            colSize={{ xs: 24, lg: 12 }}
                        />
                    )
                }
            />

            {info.data?.lightSettings?.map((lightSetting) => (
                <LightSettings
                    key={lightSetting.id}
                    loading={info.loading}
                    data={lightSetting}
                    editRequest={updateLightSettings}
                />
            ))}

            {adjustments.map((adjustment, index) => (
                <SpawnPositionAdjustments
                    bundleData={extraData.bundle}
                    key={index}
                    loading={info.loading}
                    data={adjustment}
                    editRequest={updateAdjustment(index, adjustments)}
                />
            ))}
        </>
    );
}

const initialAdjustments: Adjustments[] = [
    {
        genderIds: [],
        adjustX: null,
        adjustY: null,
        adjustZ: null,
        scale: null
    }
];
