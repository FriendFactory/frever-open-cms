import { AssetDataNames } from "./api";

export const sharedSelect = ["id", "files", "name", "createdTime", "modifiedTime", "readinessId", "tags"];

export const assetSelectsToRequest: { [key in AssetDataNames]?: string[] } = {
    BodyAnimation: [
        ...sharedSelect,
        "frameRate",
        "sizeKb",
        "duration",
        "groupId",
        "bodyAnimationSpaceSizeId",
        "bodyAnimationCategoryId",
        "animationDirectionId",
        "isStartPackMember",
        "isDefault",
        "hasFaceAnimation",
        "bodyAnimationGroupId",
        "splittable",
        "continous",
        "looping",
        "locomotion",
        "name"
    ],
    CameraAnimationTemplate: [
        "id",
        "displayName",
        "files",
        "readinessId",
        "size",
        "groupId",
        "cameraAnimationTypeId",
        "cameraCategoryId",
        "isDefault"
    ],
    Song: [
        ...sharedSelect,
        "groupId",
        "artistId",
        "labelId",
        "genreId",
        "moodId",
        "externalPartnerId",
        "samplingFrequency",
        "duration",
        "samplingSize",
        "channels",
        "size",
        "parentalExplicit"
    ],
    SFX: [
        ...sharedSelect,
        "groupId",
        "sfxCategoryId",
        "samplingFrequency",
        "duration",
        "samplingSize",
        "channels",
        "size"
    ],
    VFX: [
        ...sharedSelect,
        "sizeKb",
        "groupId",
        "vfxWorldSizeId",
        "vfxDirectionId",
        "vfxTypeId",
        "vfxCategoryId",
        "looping",
        "isStartPackMember"
    ],
    CameraFilter: [
        ...sharedSelect,
        "groupId",
        "cameraFilterCategoryId",
        "cameraFilterSubCategoryId",
        "colorFilterCategoryId",
        "lensFilterCategoryId",
        "isStartPackMember"
    ],
    SetLocation: [
        ...sharedSelect,
        "setLocationTemplateId",
        "weatherId",
        "geoReferenceId",
        "vfxTypeId",
        "setLocationCategoryId",
        "setLocationSubCategoryId",
        "pipelineId",
        "setLocationMoodId",
        "groupId",
        "isStartPackMember",
        "characterLocomotionAllowed",
        "allowPhoto",
        "allowVideo",
        "setLocationBundleId"
    ],
    Wardrobe: [
        ...sharedSelect,
        "groupId",
        "genderId",
        "wardrobeCollectionId",
        "wardrobeStyleId",
        "wardrobeCategoryId",
        "brandId",
        "overridesUpperUnderwear",
        "overridesLowerUnderwear",
        "isStartPackMember",
        "wardrobeGenderGroupId"
    ],
    VoiceFilter: [
        ...sharedSelect,
        "groupId",
        "displayName",
        "voiceFilterCategoryId",
        "volume",
        "effectParameters",
        "pitch",
        "sendLevel",
        "wetMixLevel"
    ],
    CharacterSpawnPosition: [
        "id",
        "files",
        "name",
        "setLocationBundle",
        "createdTime",
        "spawnPositionGroupId",
        "modifiedTime"
    ]
};

export const assetExpandToRequest: { [key: string]: string[] } = {
    CharacterSpawnPosition: ["setLocationBundle", "bodyAnimationAndCharacterSpawnPosition"],
    Wardrobe: ["wardrobeAndWardrobeSubCategory"]
};

export const searchAssetByName = (assetType: AssetDataNames) => {
    if (assetType === "ExternalSong") return "songName";
    if (assetType === "CameraAnimationTemplate" || assetType === "Wardrobe") return "displayName";
    return "name";
};
