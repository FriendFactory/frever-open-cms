import { ExtraDataName } from "shared";
import { AssetDataNames, ExtraFilterName } from "../services";

export interface ExtraFilter {
    name: ExtraFilterName;
    extraDataName: ExtraDataName;
    width: number;
    label: string;
}

export const assetTierFilter: ExtraFilter = {
    label: "Asset Tier",
    name: "assetTierId",
    extraDataName: "AssetTier",
    width: 320
};

export const assetReadinessFilter: ExtraFilter = {
    label: "Readiness",
    name: "readinessId",
    extraDataName: "Readiness",
    width: 320
};

export const extraFilters: {
    [key in AssetDataNames]: ExtraFilter[];
} = {
    BodyAnimation: [
        assetReadinessFilter,
        assetTierFilter,
        {
            label: "Category",
            name: "bodyAnimationCategoryId",
            extraDataName: "BodyAnimationCategory",
            width: 320
        },
        {
            label: "Group",
            name: "bodyAnimationGroupId",
            extraDataName: "BodyAnimationGroup",
            width: 320
        }
    ],
    VoiceFilter: [
        assetReadinessFilter,
        {
            label: "Category",
            name: "voiceFilterCategoryId",
            extraDataName: "VoiceFilterCategory",
            width: 320
        }
    ],
    SFX: [assetReadinessFilter, { label: "Category", name: "sfxCategoryId", extraDataName: "SFXCategory", width: 320 }],
    CameraAnimationTemplate: [
        assetReadinessFilter,
        {
            label: "Animation-Type",
            name: "cameraAnimationTypeId",
            extraDataName: "CameraAnimationType",
            width: 360
        },
        { label: "Camera-Category", name: "cameraCategoryId", extraDataName: "CameraCategory", width: 360 }
    ],
    Song: [
        assetReadinessFilter,
        { label: "Artist", name: "artistId", extraDataName: "Artist", width: 320 },
        { label: "Label", name: "labelId", extraDataName: "Label", width: 320 },
        { label: "Genre", name: "genreId", extraDataName: "Genre", width: 320 }
    ],
    VFX: [
        assetReadinessFilter,
        assetTierFilter,
        { label: "Category", name: "vfxCategoryId", extraDataName: "VFXCategory", width: 320 },
        { label: "Type", name: "vfxTypeId", extraDataName: "VFXType", width: 320 }
    ],
    CameraFilter: [
        assetReadinessFilter,
        assetTierFilter,
        {
            label: "Category",
            name: "cameraFilterCategoryId",
            extraDataName: "CameraFilterCategory",
            width: 320
        },
        {
            label: "Sub-Category",
            name: "cameraFilterSubCategoryId",
            extraDataName: "CameraFilterSubCategory",
            width: 360
        }
    ],
    SetLocation: [
        assetReadinessFilter,
        assetTierFilter,
        {
            label: "Category",
            name: "setLocationCategoryId",
            extraDataName: "SetLocationCategory",
            width: 320
        },
        {
            label: "Sub-Category",
            name: "setLocationSubCategoryId",
            extraDataName: "SetLocationSubcategory",
            width: 360
        },
        { label: "Weather", name: "weatherId", extraDataName: "Weather", width: 320 }
    ],
    Wardrobe: [
        assetReadinessFilter,
        assetTierFilter,
        { label: "Category", name: "wardrobeCategoryId", extraDataName: "WardrobeCategory", width: 320 },
        { label: "Sub-Category", name: "wardrobeSubCategoryId", extraDataName: "WardrobeSubCategory", width: 360 },
        { label: "Brand", name: "brandId", extraDataName: "Brand", width: 360 },
        { label: "Gender", name: "genderId", extraDataName: "Gender", width: 320 },
        {
            label: "Wardrobe-Collection",
            name: "wardrobeCollectionId",
            extraDataName: "WardrobeCollection",
            width: 360
        },
        {
            label: "Wardrobe-Style",
            name: "wardrobeStyleIds",
            extraDataName: "WardrobeStyle",
            width: 360
        },
        {
            label: "Wardrobe-Pattern",
            name: "wardrobePatternIds",
            extraDataName: "WardrobePattern",
            width: 360
        },
        {
            label: "Wardrobe-Material",
            name: "wardrobeMaterialIds",
            extraDataName: "WardrobeMaterial",
            width: 360
        },
        {
            label: "Wardrobe-Color",
            name: "wardrobeColorIds",
            extraDataName: "WardrobeColor",
            width: 360
        }
    ],
    CharacterSpawnPosition: [],
    ExternalSong: []
};
