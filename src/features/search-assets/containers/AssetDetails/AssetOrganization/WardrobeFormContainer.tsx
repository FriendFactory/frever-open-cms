import React from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
    AssetForm,
    WardrobeOrganization,
    CommonFormItems,
    WardrobeHairPhysicsSettings
} from "features/search-assets/components";
import { assetBatchUpdateAction, assetDetailsSelector, assetEditAction } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";
import { WardrobeAsset, WardrobePhysicsSettings } from "features/search-assets/services";

const genderGroupFields = [
    "wardrobeCollectionId",
    "brandId",
    "wardrobeFitId",
    "requiredLevel",
    "wardrobeCategoryId",
    "wardrobeAndWardrobeSubCategory",
    "wardrobePatternIds",
    "wardrobeColorIds",
    "wardrobeStyleIds",
    "wardrobeMaterialIds",
    "assetTierId",
    "publicationDate",
    "depublicationDate"
] as const;

export function WardrobeFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(assetDetailsSelector(stage, "Wardrobe", id), shallowEqual);
    const extra = useExtraDataBundle([
        "Readiness",
        "Gender",
        "Brand",
        "UserLevel",
        "AssetTier",
        "WardrobeCollection",
        "WardrobeCategory",
        "WardrobeSubCategory",
        "WardrobeStyle",
        "WardrobePattern",
        "WardrobeColor",
        "WardrobeFit",
        "WardrobeMaterial"
    ]);

    const handleOnSubmit = (data: Partial<WardrobeAsset>) => {
        const { wardrobeAndWardrobeSubCategory, ...formData }: { [key: string]: any } = data;

        if (wardrobeAndWardrobeSubCategory !== info.data?.wardrobeAndWardrobeSubCategory?.[0]?.wardrobeSubCategoryId) {
            const newSubCategory = { wardrobeSubCategoryId: wardrobeAndWardrobeSubCategory };
            const oldSubCategory = info.data?.wardrobeAndWardrobeSubCategory?.[0];

            formData.wardrobeAndWardrobeSubCategory = oldSubCategory
                ? [{ wardrobeSubCategoryId: -oldSubCategory.wardrobeSubCategoryId }, newSubCategory]
                : [newSubCategory];
            onSubmit(formData);
        }

        const genderGroupWardrobes = info.data?.wardrobeGenderGroup?.wardrobe || [];

        const includeMetaDataChanges = Object.keys(formData).some((el) => genderGroupFields.includes(el as any));

        const wardrobes: Partial<WardrobeAsset>[] = [{ ...formData, id }];

        if (includeMetaDataChanges) {
            for (let wardrobe of genderGroupWardrobes) {
                const newItem: Partial<WardrobeAsset> = { id: wardrobe.id };

                for (let field of genderGroupFields) {
                    const value = formData[field];
                    if (value) newItem[field] = value;
                }

                wardrobes.push(newItem);
            }
        }

        dispatch(
            assetBatchUpdateAction({
                stage,
                assetType: "Wardrobe",
                data: wardrobes
            })
        );
    };

    const handlePhysicsSettings = (formData: WardrobePhysicsSettings) => {
        const {
            dampingDistribSelect,
            elasticityDistribSelect,
            inertDistribSelect,
            stiffnessDistribSelect,
            radiusDistribSelect,
            ...resultFormData
        } = formData as WardrobePhysicsSettings & {
            dampingDistribSelect: string;
            elasticityDistribSelect: string;
            inertDistribSelect: string;
            stiffnessDistribSelect: string;
            radiusDistribSelect: string;
        };
        const updatedData = {
            id: info.data?.id,
            physicsSettings: { ...info.data?.physicsSettings, ...resultFormData }
        } as WardrobeAsset;

        dispatch(
            assetEditAction({
                stage,
                asset: "Wardrobe",
                data: updatedData
            })
        );
    };

    return (
        <>
            <AssetForm
                initialValues={{
                    ...info.data,
                    wardrobeAndWardrobeSubCategory:
                        info.data?.wardrobeAndWardrobeSubCategory?.[0]?.wardrobeSubCategoryId,
                    publicationDate: info.data?.publicationDate ? dayjs.utc(info.data?.publicationDate) : null,
                    depublicationDate: info.data?.depublicationDate ? dayjs.utc(info.data?.depublicationDate) : null,
                    wardrobePatternIds: info.data?.wardrobePatternIds ?? undefined,
                    wardrobeMaterialIds: info.data?.wardrobeMaterialIds ?? undefined,
                    wardrobeColorIds: info.data?.wardrobeColorIds ?? undefined,
                    wardrobeStyleIds: info.data?.wardrobeStyleIds ?? undefined,
                    compatibleGenderIds: info.data?.compatibleGenderIds ?? undefined
                }}
                loading={(!info.data && info.loading) || extra.loading}
                disabled={info.loading}
                onSubmit={handleOnSubmit}
                informationSection={
                    info.data && (
                        <CommonFormItems name="displayName" readinessList={extra.bundle["Readiness"]?.data ?? []} />
                    )
                }
                organizationSection={
                    info.data && (
                        <WardrobeOrganization
                            stage={stage}
                            groupId={info.data.groupId}
                            wardrobeId={info.data.id}
                            availableForBaking={info.data.availableForBaking}
                            wardrobeBakingDisableReason={info.data.wardrobeBakingDisableReason}
                            seasonId={info.data.seasonId}
                            bundleData={extra.bundle}
                        />
                    )
                }
            />
            {extra.bundle?.WardrobeCategory?.data?.find(
                (val) => val.id === info.data?.wardrobeCategoryId && val.name === "Hair"
            ) && (
                <WardrobeHairPhysicsSettings
                    data={info.data?.physicsSettings ?? ({} as WardrobePhysicsSettings)}
                    loading={info.loading}
                    editRequest={handlePhysicsSettings}
                />
            )}
        </>
    );
}
