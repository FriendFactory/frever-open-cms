import { CharacterSpawnPosition } from "features/search-assets/services";
import { ThumbnailFile } from "shared";

export interface AssetFormData {
    id: number;
    [key: string]: string | number | null | Array<string | number | object | ThumbnailFile>;
}

export interface CommonExtraDataType {
    id: number;
    name: string;
}

export interface Tag extends CommonExtraDataType {
    categoryId: number;
    sortOrder: number;
}

export interface WardrobeSubCategory extends CommonExtraDataType {
    wardrobeCategoryId: number;
    sortOrder: number;
}

export interface Genre extends CommonExtraDataType {
    labelId: number;
    sortOrder: number;
    countries: string[] | null;
}

export interface TemplateCategory extends CommonExtraDataType {
    sortingOrder: number;
}

export interface TemplateSubCategory extends TemplateCategory {
    templateCategoryId: number;
}

export interface UmaSharedColor extends CommonExtraDataType {
    colors: number[];
}

export interface UserLevel extends CommonExtraDataType {
    xpRequired: number;
    level: number;
}

export interface PagesNavigation extends CommonExtraDataType {
    pages: number[];
    description: string | null;
}

export interface EditorSettings extends CommonExtraDataType {
    hasCharacterEditorSettings: boolean;
    hasLevelEditorSettings: boolean;
    hasPostRecordEditorSettings: boolean;
}

export interface MovementType extends CommonExtraDataType {
    autoSetOnAssetManager: boolean;
    characterSpawnPosition: CharacterSpawnPosition | null;
    defaultBodyAnimationId: number | null;
    sortOrder: number;
    supportFormation: boolean;
}

export interface UMAAdjustment extends CommonExtraDataType {
    key: string;
    sortOrder: number;
    wardrobeSubCategoryAndUmaAdjustment: {
        wardrobeSubCategoryId: number;
        umaAdjustmentId: number;
    }[];
}

export interface Country extends CommonExtraDataType {
    isoName: string;
    isO2Code: string;
    displayName: string;
    mobileNumberPrefix: string;
    enableMusic: boolean;
    availableForMarketing: boolean;
}

export interface Language extends CommonExtraDataType {
    isoCode: string;
    isO2Code: string;
}

export interface Album extends CommonExtraDataType {
    artistId: number;
}

export interface SetLocationCategory extends CommonExtraDataType {
    sortOrder: number;
}

export interface SetLocationSubCategory extends CommonExtraDataType {
    setLocationCategoryId: number;
}

export interface WardrobeCategory extends CommonExtraDataType {
    sortOrder: number;
}

export interface BodyAnimationCategory extends CommonExtraDataType {
    sortOrder: number;
}

export interface VFXCategory extends CommonExtraDataType {
    sortOrder: number;
}

export interface CameraFilterCategory extends CommonExtraDataType {
    sortOrder: number;
}

export interface Emotion extends CommonExtraDataType {
    emojiCode: string;
    sortOrder: number;
    files: ThumbnailFile[];
}

export interface Gender extends CommonExtraDataType {
    raceId: number;
}

export type ExtraDataWithCommonTypeName =
    | "Artist"
    | "Mood"
    | "Label"
    | "SFXCategory"
    | "AnimationDirection"
    | "BodyAnimationCategory"
    | "BodyAnimationSpaceSize"
    | "BodyAnimationGroup"
    | "CameraCategory"
    | "CameraAnimationType"
    | "VFXCategory"
    | "VFXType"
    | "VFXDirection"
    | "VFXWorldSize"
    | "CameraFilterCategory"
    | "LensFilterCategory"
    | "ColorFilterCategory"
    | "CameraFilterSubCategory"
    | "SetLocationMood"
    | "Pipeline"
    | "WardrobeCategory"
    | "Brand"
    | "WardrobeStyle"
    | "WardrobeCollection"
    | "Gender"
    | "GeoReference"
    | "Weather"
    | "SetLocationTemplate"
    | "SpawnPositionSpaceSize"
    | "Readiness"
    | "TagCategory"
    | "MovementType"
    | "AssetWardrobeSlot"
    | "VoiceFilterCategory"
    | "AssetTier"
    | "Editor-Settings"
    | "WardrobePattern"
    | "WardrobeColor"
    | "WardrobeFit"
    | "WardrobeMaterial"
    | "Emotion"
    | "CharacterSpawnPositionFormationType"
    | "video-report/moderation/reasons"
    | "chat/moderation/report/reason"
    | "Race/moderation"
    | "Watermark";

export type ExtraDataWithCommonType = { [key in ExtraDataWithCommonTypeName]?: CommonExtraDataType[] };

export interface ExtraDataTypes extends ExtraDataWithCommonType {
    Tag?: Tag[];
    TemplateCategory?: TemplateCategory[];
    WardrobeSubCategory?: WardrobeSubCategory[];
    TemplateSubCategory?: TemplateSubCategory[];
    UmaSharedColor?: UmaSharedColor[];
    Genre?: Genre[];
    UserLevel?: UserLevel[];
    PagesNavigation?: PagesNavigation[];
    "Editor-Settings"?: EditorSettings[];
    UMAAdjustment?: UMAAdjustment[];
    Country?: Country[];
    Language?: Language[];
    Album: Album[];
    SetLocationCategory: SetLocationCategory[];
    SetLocationSubcategory: SetLocationSubCategory[];
    WardrobeCategory: WardrobeCategory[];
    BodyAnimationCategory: BodyAnimationCategory[];
    VFXCategory: VFXCategory[];
    CameraFilterCategory: CameraFilterCategory[];
    Emotion: Emotion[];
    Gender: Gender[];
}

export type ExtraDataName = keyof ExtraDataTypes;
export type ExtraDataType<T extends ExtraDataName = ExtraDataName> = NonNullable<ExtraDataTypes[T]>[number];
