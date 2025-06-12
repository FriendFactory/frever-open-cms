import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";

import { AssetForm, VFXOrganization, CommonFormItems, VFXAdjustments } from "features/search-assets/components";
import { assetDetailsSelector, assetEditAction } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";
import { VfxAdjustments } from "features/search-assets/services";
import { useDispatch } from "react-redux";
import { App } from "antd";

export function VFXFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const { message } = App.useApp();
    const dispatch = useDispatch();
    const info = useSelector(assetDetailsSelector(stage, "VFX", id));
    const extraData = useExtraDataBundle([
        "Readiness",
        "VFXWorldSize",
        "VFXDirection",
        "VFXType",
        "VFXCategory",
        "UserLevel",
        "AssetTier",
        "Race/moderation",
        "Gender"
    ]);

    const updateAdjustment = (index: number, sourceAdjustments: VfxAdjustments[]) => (formData: VfxAdjustments) => {
        if (!info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        const newAdjustments = _.cloneDeep(sourceAdjustments);
        newAdjustments[index] = formData;

        const updatedData = { id: info.data?.id, adjustments: newAdjustments };

        dispatch(
            assetEditAction({
                stage,
                asset: "VFX",
                data: updatedData
            })
        );
    };

    const adjustments = info.data?.adjustments?.length ? info.data?.adjustments : initialVFXAdjustments;

    return (
        <>
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
                    info.data && (
                        <CommonFormItems name="name" readinessList={extraData.bundle["Readiness"]?.data ?? []} />
                    )
                }
                organizationSection={
                    info.data && <VFXOrganization stage={stage} data={info.data} bundleData={extraData.bundle} />
                }
            />
            {adjustments.map((adjustment, index) => (
                <VFXAdjustments
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

const initialVFXAdjustments: VfxAdjustments[] = [
    {
        genderIds: [],
        adjustPosition: null,
        adjustRotation: null,
        scale: null,
        space: null
    }
];
