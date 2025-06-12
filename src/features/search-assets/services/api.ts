import { CommonExtraDataType, ThumbnailFile } from "shared";
import { AssetOfferType } from ".";

export const assetsWithEmotions = ["Song", "BodyAnimation"] as const;

export type EmotionAssetName = typeof assetsWithEmotions[number];

export type EmotionAsset<T extends EmotionAssetName = EmotionAssetName> = AssetData[T];

export type MigrationEntity =
    | "SetLocationBundle"
    | "SetLocation"
    | "UmaBundle"
    | "UmaAsset"
    | "Song"
    | "Wardrobe"
    | "VfxSpawnPosition"
    | "VfxPositionGroup"
    | "Vfx"
    | "CharacterSpawnPosition"
    | "Artist"
    | "Album"
    | "Song"
    | "BodyAnimation"
    | "CameraAnimationTemplate"
    | "CameraFilter"
    | "SetLocationBackgroundSettings";

export interface AssetData {
    BodyAnimation: BodyAnimationAsset;
    CameraAnimationTemplate: CameraAnimationTemplateAsset;
    Song: SongAsset;
    SFX: SFXAsset;
    VFX: VFXAsset;
    CameraFilter: CameraFilterAsset;
    SetLocation: SetLocationAsset;
    Wardrobe: WardrobeAsset;
    VoiceFilter: VoiceFilterAsset;
    CharacterSpawnPosition: CharacterSpawnPosition;
    ExternalSong: ExternalSong;
}

export type AssetDataNames = keyof AssetData;

export type AssetType<T extends AssetDataNames> = AssetData[T];

export type BundleAssetNames = keyof Pick<AssetData, "VFX" | "BodyAnimation">;

export interface ExternalSong {
    id: number;
    songName: string;
    artistName: string;
    externalTrackId: number;
    sortOrder: number;
    challengeSortOrder: number | null;
    isDeleted: boolean;
    isManuallyDeleted: boolean;
    musicController: [];
    isrc: string | null;
    lastLicenseStatusCheckAt: string | null;
    notClearedSince: string | null;
    excludedCountries: string[];
}

export interface VoiceFilterAsset {
    files: Array<ThumbnailFile>;
    assetStoreInfoId: null;
    id: number;
    volume: number;
    pitch: number;
    sendLevel: number;
    wetMixLevel: number;
    effectParameters: number;
    voiceFilterCategoryId: number;
    groupId: number;
    readinessId: number;
    createdTime: string;
    modifiedTime: string;
    name: string;
    displayName: string;
    updatedByUserId: number;
    uploaderUserId: number;
    tags: Array<number>;
    sortOrder: number;
    requiredLevel: number | null;
    compatibleRaceIds: number[] | null;
}

export interface BodyAnimationAsset {
    id: number;
    name: string;
    animationDirectionId: number;
    groupId: number;
    readinessId: number;
    locomotion: boolean;
    looping: boolean;
    continous: boolean;
    splittable: boolean;
    createdTime: string;
    modifiedTime: string;
    sizeKb: number;
    duration: number;
    frameRate: number;
    files: Array<ThumbnailFile>;
    bodyAnimationCategoryId: number;
    bodyAnimationGroupId: number | null;
    orderIndexInGroup: number | null;
    movementTypeId: number | null;
    updatedByUserId: number;
    uploaderUserId: number;
    isDefault: boolean;
    isStartPackMember: boolean;
    bodyAnimationSpaceSizeId: number;
    tags: Array<number>;
    sortOrder: number;
    thumbnailCharacter: number;
    hasFaceAnimation: boolean;
    bodyAnimationAndCharacterSpawnPosition: Array<{ bodyAnimationId: number; characterSpawnPositionId: number }>;
    bodyAnimationAndVfx: BodyAnimationAndVfx[] | null;
    requiredLevel: number | null;
    publicationDate: string | null;
    depublicationDate: string | null;
    assetTierId: number | null;
    emotions: number[] | null;
    compatibleRaceIds: number[] | null;
}

export interface BodyAnimationAndVfx {
    bodyAnimationId: number;
    vfxId: number;
    startTime: number | null;
    endTime: number | null;
}

export interface CameraAnimationTemplateAsset {
    displayName: string;
    id: number;
    groupId: number;
    cameraCategoryId: number;
    cameraAnimationTypeId: number;
    size: number | null;
    readinessId: number;
    uploaderUserId: number;
    isDefault: boolean;
    cameraAnimationId: number;
    sortOrder: number;
    readiness: CommonExtraDataType | null;
    qaComments: [];
    files: Array<ThumbnailFile>;
}
export interface CameraAnimationAsset {
    id: number;
    name: string;
    readinessId: number;
    groupId: number;
    createdTime: string;
    modifiedTime: string;
    group: number;
    tags: Array<number>;
    files: Array<ThumbnailFile>;
    cameraAnimationTypeId: number | null;
    cameraCategoryId: number | null;
    sizeKb: number | null;
    isDefault: boolean | null;
}

export interface SFXAsset {
    files: Array<ThumbnailFile>;
    id: number;
    sfxCategoryId: number;
    groupId: number;
    createdTime: string;
    modifiedTime: string;
    readinessId: number;
    size: number | null;
    channels: number;
    samplingSize: number;
    duration: number;
    samplingFrequency: number;
    name: string;
    updatedByUserId: number;
    uploaderUserId: number;
    tags: Array<number>;
    sortOrder: number;
}

export interface SongAsset {
    files: Array<ThumbnailFile>;
    id: number;
    genreId: number;
    artistId: number;
    labelId: number;
    groupId: number;
    createdTime: string;
    modifiedTime: string;
    readinessId: number;
    size: number | null;
    channels: number;
    samplingSize: number;
    duration: number;
    samplingFrequency: number;
    name: string;
    albumId: number | null;
    updatedByUserId: number;
    uploaderUserId: number;
    tags: Array<number>;
    sortOrder: number;
    parentalExplicit: boolean;
    moodId: number;
    externalPartnerId: string;
    publicationDate: string | null;
    depublicationDate: string | null;
    emotions: number[] | null;
    availableForCountries: string[];
}

export interface VFXAsset {
    files: Array<ThumbnailFile>;
    id: number;
    vfxCategoryId: number;
    vfxTypeId: number;
    groupId: number;
    readinessId: number;
    vfxDirectionId: number;
    vfxWorldSizeId: number;
    looping: boolean;
    createdTime: string;
    modifiedTime: string;
    sizeKb: number;
    name: string;
    isDefault: boolean;
    isStartPackMember: boolean;
    updatedByUserId: number;
    uploaderUserId: number;
    tags: Array<number>;
    sortOrder: number;
    requiredLevel: number | null;
    publicationDate: string | null;
    depublicationDate: string | null;
    assetTierId: number | null;
    compatibleRaceIds: number[] | null;
    adjustments: VfxAdjustments[];
    anchorPoints: string;
    followRotation: boolean;
}

export interface VfxAdjustments {
    genderIds: number[];
    adjustPosition: AdjustVectors | null;
    adjustRotation: AdjustVectors | null;
    scale: number | null;
    space: number | null;
}

export const VfxSpace = ["Local", "World"] as const;

export interface AdjustVectors {
    x: number;
    y: number;
    z: number;
}

export const VfxAnchorPoints = ["head", "mouth", "left_hand", "right_hand", "root", "spine"] as const;

export interface CameraFilterAsset {
    id: number;
    groupId: number;
    cameraFilterCategoryId: number;
    lensFilterCategoryId: number;
    readinessId: number;
    colorFilterCategoryId: number;
    updatedByUserId: number;
    uploaderUserId: number;
    sortOrder: number;
    cameraFilterSubCategoryId: number;
    tags: Array<number>;
    name: string;
    isStartPackMember: boolean;
    createdTime: string;
    modifiedTime: string;
    files: Array<ThumbnailFile>;
    cameraFilterVariant?: Array<CameraFilterVariant>;
    requiredLevel: number | null;
    publicationDate: string | null;
    depublicationDate: string | null;
    assetTierId: number | null;
    compatibleRaceIds: number[] | null;
}

export interface CameraFilterVariant {
    id: number;
    name: string;
    readinessId: number;
    sizeKb: number;
    files: Array<ThumbnailFile>;
}

export interface WardrobeAsset {
    files: Array<ThumbnailFile>;
    id: number;
    groupId: number;
    availableForBaking: boolean;
    wardrobeCategoryId: number;
    wardrobeStyleId: number;
    readinessId: number;
    createdTime: string;
    modifiedTime: string;
    name: string;
    umaBundleId: number;
    updatedByUserId: number;
    uploaderUserId: number;
    genderId: number;
    isStartPackMember: boolean;
    overridesLowerUnderwear: boolean;
    overridesUpperUnderwear: boolean;
    wardrobeCollectionId: number;
    brandId: number;
    tags: Array<number>;
    umaBundle: UmaBundle | null;
    wardrobeAndWardrobeSubCategory: Array<WardrobeAndWardrobeSubCategory>;
    wardrobeGenderGroupId: number | null;
    wardrobeGenderGroup: WardrobeGenderGroup | null;
    requiredLevel: number | null;
    publicationDate: string | null;
    depublicationDate: string | null;
    assetTierId: number | null;
    wardrobePatternId: number | null;
    wardrobeColorId: number | null;
    wardrobeFitId: number | null;
    wardrobeMaterialId: number | null;
    wardrobePatternIds: number[] | null;
    wardrobeColorIds: number[] | null;
    wardrobeMaterialIds: number[] | null;
    wardrobeStyleIds: number[] | null;
    seasonId: number | null;
    themeCollectionAndWardrobe: ThemeCollectionAndWardrobe[] | null;

    hardCurrencyPrice: number | null;
    softCurrencyPrice: number | null;
    wardrobeSubCategoryIds: number[];
    compatibleGenderIds: number[] | null;
    wardrobeBakingDisableReason: WardrobeBakingDisableReason | null;
    physicsSettings: WardrobePhysicsSettings | null;
}

export interface WardrobePhysicsSettings {
    damping: number;
    dampingDistrib: Keyframe | null;
    elasticity: number;
    elasticityDistrib: Keyframe | null;
    stiffness: number;
    stiffnessDistrib: Keyframe | null;
    inert: number;
    inertDistrib: Keyframe | null;
    radius: number;
    radiusDistrib: Keyframe | null;
    endOffset: AdjustVectors;
    gravity: AdjustVectors;
    force: AdjustVectors;
}

export interface Keyframe {
    keys: {
        time: number;
        value: number;
        inTangent: number;
        outTangent: number;
        tangentMode: number;
        weightedMode: number;
        inWeight: number;
        outWeight: number;
    }[];
}

export interface WardrobeAndWardrobeSubCategory {
    wardrobeId: number;
    wardrobeSubCategoryId: number;
    subCategorySortOrder: number;
}

export interface WardrobeGenderGroup {
    id: number;
    globalId: string;
    wardrobe: Array<WardrobeAsset>;
}

export interface WardrobeBakingDisableReason {
    id: number;
    wardrobeId: number;
    createdTime: string;
    reason: string;
}

export interface ThemeCollectionAndWardrobe {
    themeCollectionId: number;
    wardrobeId: number;
}

export interface UmaBundle {
    id: number;
    assetBundleName: string;
    assetBundleHash: string;
    encryptedName: string;
    umaBundleTypeId: number;
    groupId: number;
    sizeKb: number;
    readinessId: number;
    group: null;
    umaBundleType: { id: number; name: string };
    umaAsset: Array<UmaAsset>;
    umaBundleAllDependencyDependsOnBundle: Array<{ umaBundleId: number; dependsOnBundleId: number }>;
    umaBundleDirectDependencyDependsOnBundle: Array<{ umaBundleId: number; dependsOnBundleId: number }>;
    umaBundleAllDependencyUmaBundle: Array<{ umaBundleId: number; dependsOnBundleId: number }>;
    umaBundleDirectDependencyUmaBundle: Array<{ umaBundleId: number; dependsOnBundleId: number }>;
    wardrobe: Array<WardrobeAsset>;
    files: Array<{
        source: {
            uploadId: string;
        };
        version: string;
        file: number;
        extension: number;
    }>;
}

export interface UmaAsset {
    id: number;
    assetHash: number;
    assetName: string;
    umaBundleId: number;
    assetWardrobeSlotId: number | null;
    umaAssetFile: Array<{
        id: number;
        name: string;
        umaAssetId: number;
        umaAssetFileAndUnityAssetType: Array<{
            umaAssetFileId: number;
            unityAssetTypeId: number;
            unityAssetType: {
                id: number;
                name: string;
            };
        }>;
    }>;
}

export interface SetLocationAsset {
    files: Array<ThumbnailFile>;
    id: number;
    sortOrderByCategory: number | null;
    sortOrderForVideoMessage: number | null;
    setLocationCategoryId: number;
    setLocationMoodId: number;
    setLocationTemplateId: number;
    groupId: number;
    allowPhoto: boolean;
    allowVideo: boolean;
    allowForVideoMessage: boolean;
    allowForNormalEditor: boolean;
    vfxSpawnPositionIndexMax: number;
    geoReferenceId: number;
    weatherId: number;
    readinessId: number;
    characterLocomotionAllowed: boolean;
    createdTime: string;
    modifiedTime: string;
    name: string;
    updatedByUserId: number;
    uploaderUserId: number;
    vfxTypeId: number;
    pipelineId: number;
    setLocationBundleId: number;
    setLocationSubCategoryId: number;
    isDefault: boolean;
    isStartPackMember: boolean;
    isExcludedFromLists: boolean;
    tags: Array<number>;
    setLocationBundle: SetLocationBundle | null;
    setLocationAndCharacterSpawnPosition: Array<SetLocationAndCharacterSpawnPosition>;
    vfxPositionGroup: Array<VfxPositionGroup>;
    requiredLevel: number | null;
    recommendSortOrder: number | null;
    publicationDate: string | null;
    depublicationDate: string | null;
    assetTierId: number | null;
    compatibleRaceIds: number[] | null;
}

export interface VfxPositionGroup {
    name: string;
    id: number;
    vfxTypeId: number;
    setLocationId: number;
    vfxPositionGroupAndVfxSpawnPosition: VfxPositionGroupAndVfxSpawnPosition;
}

export interface VfxPositionGroupAndVfxSpawnPosition {
    vfxPositionGroupId: number;
    vfxSpawnPositionId: number;
    vfxSpawnPosition: VfxSpawnPosition;
}

export interface VfxSpawnPosition {
    id: number;
    setLocationBundleId: number;
    unityGuid: string;
    name: string;
    setLocationBundle: SetLocationBundle;
}

export interface SetLocationBundle {
    files: Array<ThumbnailFile>;
    id: number;
    groupId: number;
    name: string;
    createdTime: string;
    modifiedTime: string;
    unityGuid: string;
    polyCount: number;
    sizeKb: number;
    readinessId: number;
    characterSpawnPosition: Array<CharacterSpawnPosition>;
    vfxSpawnPosition: VfxSpawnPosition;
}

export interface SetLocationAndCharacterSpawnPosition {
    characterSpawnPositionId: number;
    setLocationId: number;
    sortOrder: number;
    characterSpawnPosition: CharacterSpawnPosition;
}

export interface CharacterSpawnPosition {
    id: number;
    setLocationBundleId: number;
    groupId: number;
    unityGuid: string;
    name: string;
    createdTime: string;
    modifiedTime: string;
    spawnPositionSpaceSizeId: number;
    maxCharactersAmount: number;
    defaultDayTime: number;
    movementTypeId: number | null;
    availableForSelection: boolean;
    spawnPositionGroupId: number | null;
    spawnOrderIndex: number | null;
    defaultBodyAnimationId: number | null;
    bodyAnimationSpaceSizeId: number;
    moving: boolean;
    isDefault: boolean;
    setLocationBundle: SetLocationBundle | null;
    lightSettings: LightSettings[];
    adjustments: Adjustments[];
    files: ThumbnailFile[];
    bodyAnimationAndCharacterSpawnPosition: Array<{ bodyAnimationId: number; characterSpawnPositionId: number }>;
    tags: number[];

    // An entity that must be loaded manually. This is needed for the Task page
    setLocation?: CharacterSpawnPositionSetLocation;
}

export interface CharacterSpawnPositionSetLocation {
    id: number;
    name: string;
    readinessId: number;
    isExcludedFromLists: boolean;
}

export interface LightSettings {
    id: number;
    intensity: number;
    characterSpawnPositionId: number;
    color: string;
    unityGuid: string;
    globalId: string;
}

export interface Adjustments {
    genderIds: number[];
    scale: number | null;
    adjustX: number | null;
    adjustY: number | null;
    adjustZ: number | null;
}

export interface AssetOffer {
    id: number;
    title: string;
    description: string;
    softCurrencyPrice: number | null;
    hardCurrencyPrice: number | null;
    isActive: boolean;
    createdTime: string;
    createdByGroupId: number;
}

export interface AssetOfferWithAssetInfo {
    assetOfferId: number;
    isActive: boolean;
    assetId: number;
    assetType: AssetOfferType;
    assetOffer: AssetOffer;
}
