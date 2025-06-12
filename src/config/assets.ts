export const Assets = {
    BodyAnimation: { title: "Body Animation", ordinal: 0 },
    CameraAnimationTemplate: { title: "Camera Animation", ordinal: 1 },
    Song: { title: "Songs", ordinal: 2 },
    SFX: { title: "SFX", ordinal: 3 },
    VFX: { title: "VFX", ordinal: 4 },
    CameraFilter: { title: "Camera Filter", ordinal: 5 },
    VoiceFilter: { title: "Voice Filter", ordinal: 6 },
    SetLocation: { title: "Set Location", ordinal: 7 },
    CharacterSpawnPosition: { title: 'Spawn Position', ordinal: 8},
    Wardrobe: { title: "Wardrobe", ordinal: 9 },
};

export type AssetTypes = keyof typeof Assets;
