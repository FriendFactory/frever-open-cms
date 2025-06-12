import { FileExtensions } from "config";

export const commonThumbnailResolutions = [
    { width: 128, height: 128 },
    { width: 256, height: 256 },
    { width: 512, height: 512 }
];

export const validThumbnailResolutions = {
    Song: commonThumbnailResolutions,
    SFX: commonThumbnailResolutions,
    BodyAnimation: commonThumbnailResolutions,
    CameraAnimation: commonThumbnailResolutions,
    VFX: commonThumbnailResolutions,
    CameraFilter: commonThumbnailResolutions,
    SetLocation: [...commonThumbnailResolutions, { width: 1600, height: 900 }],
    Wardrobe: commonThumbnailResolutions
};

export const assetFileExtensions = {
    Song: { mainFile: FileExtensions.Mp3, thumbnail: FileExtensions.Png },
    SFX: { mainFile: FileExtensions.Mp3, thumbnail: FileExtensions.Png },
    BodyAnimation: { mainFile: FileExtensions.Empty, thumbnail: FileExtensions.Gif },
    CameraAnimation: { mainFile: FileExtensions.Txt, thumbnail: undefined },
    VFX: { mainFile: FileExtensions.Empty, thumbnail: FileExtensions.Gif },
    CameraFilter: { mainFile: undefined, thumbnail: FileExtensions.Png },
    SetLocation: { mainFile: undefined, thumbnail: FileExtensions.Png },
    Wardrobe: { mainFile: undefined, thumbnail: FileExtensions.Png }
};

export const hairPhysicsTemplateCurves = {
    Linear: '{"keys":[{"time":0.0,"value":0.0,"inTangent":1.0,"outTangent":1.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":34},{"time":1.0,"value":1.0,"inTangent":1.0,"outTangent":1.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":34}]}',
    EaseIn: '{"keys":[{"time":0.0,"value":0.0,"inTangent":0.0,"outTangent":0.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":0},{"time":0.555750549,"value":0.308858663,"inTangent":1.111501,"outTangent":1.111501,"inWeight":0.333333343,"outWeight":0.333333343,"weightedMode":0,"tangentMode":0},{"time":1.0,"value":1.0,"inTangent":2.0,"outTangent":2.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":0}]}',
    EaseOut:
        '{"keys":[{"time":0.0,"value":0.0,"inTangent":2.0,"outTangent":2.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":0},{"time":0.424391836,"value":0.668675244,"inTangent":1.15121627,"outTangent":1.15121627,"inWeight":0.333333343,"outWeight":0.333333343,"weightedMode":0,"tangentMode":0},{"time":1.0,"value":1.0,"inTangent":0.0,"outTangent":0.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":0}]}',
    EaseInOut:
        '{"keys":[{"time":0.0,"value":0.0,"inTangent":0.0,"outTangent":0.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":0},{"time":0.249302939,"value":0.155466527,"inTangent":1.122906,"outTangent":1.122906,"inWeight":0.333333343,"outWeight":0.333333343,"weightedMode":0,"tangentMode":0},{"time":0.772427738,"value":0.8682041,"inTangent":1.05469847,"outTangent":1.05469847,"inWeight":0.333333343,"outWeight":0.333333343,"weightedMode":0,"tangentMode":0},{"time":1.0,"value":1.0,"inTangent":0.0,"outTangent":0.0,"inWeight":0.0,"outWeight":0.0,"weightedMode":0,"tangentMode":0}]}'
};
