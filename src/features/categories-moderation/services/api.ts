export interface EditorSettings {
    id: number;
    name: string;
    remix: boolean;
    levelCreation: boolean;

    levelEditorSettings: {
        cameraAnimationSettings: CameraAnimationSettings;
        cameraFilterSettings: CameraFilterSettings;
        outfitSettings: OutfitSettings;
        bodyAnimationSettings: BodyAnimationSettings;
        characterSettings: CharacterSettings;
        musicSettings: MusicSettings;
        vfxSettings: VfxSettings;
        voiceFilterSettings: VoiceFilterSettings;
        setLocationSettings: SetLocationSettings;
        eventDeletionSettings: EventDeletionSettings;
        faceTrackingSettings: { allowSwitching: boolean };
        nonLevelVideoUploadSettings: { allowUploading: boolean };
        previewLastEventSettings: { allowPreview: boolean };
        templateSettings: { allowEditing: boolean };
    };

    postRecordEditorSettings: {
        bodyAnimationSettings: BodyAnimationSettings;
        cameraAnimationSettings: CameraAnimationSettings;
        cameraFilterSettings: CameraFilterSettings;
        characterSettings: CharacterSettings;
        musicSettings: MusicSettings;
        outfitSettings: OutfitSettings;
        setLocationSettings: SetLocationSettings;
        eventDeletionSettings: EventDeletionSettings;
        vfxSettings: VfxSettings;
        voiceFilterSettings: VoiceFilterSettings;
        eventCreationSettings: { templateId: null; allowEventCreation: boolean };
        captionSettings: { allowEditing: boolean };
        volumeSettings: { allowEditing: boolean };
    };

    characterEditorSettings: {
        wardrobeCategories: Array<{
            id: number;
            subcategories: Array<{
                id: number;
                allowAdjustment: boolean;
            }>;
        }>;
        filterSettings: { allowFiltering: boolean };
        savingCharacterSettings: { allowSaveCharacter: boolean };
        savingOutfitSettings: { allowSaveOutfit: boolean };
        zoomSettings: { allowZooming: boolean };
    };
}

export interface CameraAnimationSettings {
    allowEditing: boolean;
    templateIds: number[];
}

export interface CameraFilterSettings {
    allowEditing: boolean;
    categories: number[];
}

export interface OutfitSettings {
    allowEditing: boolean;
    allowForOwnCharacters: boolean;
    allowForFreverStars: boolean;
    allowForFriendCharacters: boolean;
    allowCreateNew: boolean;
}

export interface BodyAnimationSettings {
    allowEditing: boolean;
    categories: number[];
}

export interface CharacterSettings {
    allowEditing: boolean;
}

export interface MusicSettings {
    allowEditing: boolean;
    songSettings: {};
    externalSongSettings: {
        ids: number[];
    };
    userSoundSettings: {
        allowUserSounds: boolean;
    };
}

export interface SetLocationSettings {
    allowPhotoUploading: boolean;
    allowVideoUploading: boolean;
    allowChangeDayTime: boolean;
    allowChangeSetLocation: boolean;
    categories: number[];
    tags: number[];
}

export interface EventDeletionSettings {
    allowDeleting: boolean;
}

export interface VfxSettings {
    allowEditing: boolean;
    categories: number[];
}

export interface VoiceFilterSettings {
    allowEditing: boolean;
    allowDisablingVoiceFilter: boolean;
    ids: number[];
}

export interface GeoCluster {
    id: number;
    priority: number;
    recommendationVideosPool: number;
    recommendationNumOfDaysLookback: number;
    title: string;
    isActive: boolean;
    includeVideoFromCountry: string[];
    excludeVideoFromCountry: string[];
    includeVideoWithLanguage: string[];
    excludeVideoWithLanguage: string[];
    showToUserFromCountry: string[];
    hideForUserFromCountry: string[];
    showForUserWithLanguage: string[];
    hideForUserWithLanguage: string[];
}
