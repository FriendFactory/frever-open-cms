import { ThumbnailFile } from "shared";
import { UserSound } from "features/user-media/services";
import { Character } from "features/user-moderation/services";
import {
    BodyAnimationAsset,
    CameraAnimationAsset,
    CameraAnimationTemplateAsset,
    CameraFilterVariant,
    SetLocationAsset,
    SongAsset,
    VFXAsset,
    VoiceFilterAsset
} from "features/search-assets/services";

export interface LevelEvent {
    id: number;
    files: ThumbnailFile[];
    createdTime: string;
    modifiedTime: string;
    autoclipId: number | null;
    groupId: number;
    levelId: number;
    levelSequence: number;
    targetCharacterSequenceNumber: number;
    length: number;
    characterSpawnPositionId: number;
    characterSpawnPositionFormationId: number;
    templateId: null | number;
    autoclip: null;
    characterSpawnPosition: null;
    characterSpawnPositionFormation: null;
    group: null;
    level: null;
    caption: [];
    eventAndEventSpecialAssetbundle: [];
    propController: [];
    stickerController: [];
    characterController?: CharacterController[];
    cameraController?: CameraController[];
    setLocationController?: SetLocationController[];
    vfxController?: VFXController[];
    cameraFilterController?: CameraFilterController[];
    musicController?: MusicController[];
    sfxController: [];
}

export interface CameraController {
    id: number;
    eventId: number;
    controllerSequenceNumber: number;
    activationCue: number;
    endCue: number;
    cameraAnimationTemplateId: number;
    spawnIndex: number;
    startDepthOfFieldOffset: number;
    endDepthOfFieldOffset: number;
    startFocusDistance: number;
    endFocusDistance: number;
    followSpawnPositionIndex: number | null;
    lookAtIndex: number;
    cameraNoiseSettingsIndex: number;
    followAll: boolean;
    autoFocus: boolean;
    autoRoll: boolean;
    followZoom: boolean;
    cameraAnimationId: number;
    templateSpeed: number;
    cameraAnimation: CameraAnimationAsset;
    cameraAnimationTemplate: CameraAnimationTemplateAsset;
}

export interface CharacterController {
    id: number;
    eventId: number;
    controllerSequenceNumber: number;
    characterId: number;
    activationCue: number;
    endCue: number;
    rotation: number;
    outfitId: number;
    character: Character | null;
    outfit: null;
    characterControllerBackgroundDancer: [];
    characterControllerBodyAnimation: Array<{
        id: number;
        characterControllerId: number;
        controllerSequenceNumber: number;
        primaryBodyAnimationId: number;
        lowerBodyAnimationId?: number;
        animationSpeed: number;
        activationCue: number;
        endCue: number;
        locomotion: boolean;
        looping: boolean;
        lowerBodyAnimation: null;
        primaryBodyAnimation: BodyAnimationAsset;
    }>;
    characterControllerFaceVoice: Array<{
        id: number;
        characterControllerId: number;
        controllerSequenceNumber: number;
        voiceTrackId?: number;
        faceAnimationId: number;
        voiceFilterId: number;
        activationCue: number;
        endCue: number;
        voiceSoundVolume: number;
        extremeExpressionId?: number;
        faceVfxId?: number;
        extremeExpression: null;
        faceAnimation: {
            id: number;
            assetStoreInfoId?: number;
            groupId: number;
            createdTime: string;
            modifiedTime: string;
            faceAnimationCategoryId: number;
            size?: number;
            duration: number;
            frameRate: number;
            uploaderUserId: number;
            tags: null;
            assetStoreInfo: null;
            faceAnimationCategory: null;
            group: null;
            uploaderUser: null;
            characterControllerBackgroundDancer: [];
            characterControllerFaceVoice: [];
            qaComments: [];
            files: Array<ThumbnailFile>;
        };
        faceVfx: null;
        voiceFilter: VoiceFilterAsset;
        voiceTrack: null;
    }>;
    characterControllerUmaRecipe: [];
}

export interface SetLocationController {
    id: number;
    eventId: number;
    controllerSequenceNumber: number;
    setLocationId: number;
    activationCue: number;
    endCue: number;
    timeOfDay?: number;
    weatherId: number;
    crowdId?: number;
    crowdMovementId?: number;
    videoSoundVolume: number;
    maxCrowds: null;
    timelapseSpeed: null;
    npeAnimationSpeed: null;
    videoClipId: null;
    photoId: null;
    videoActivationCue: null;
    videoEndCue: null;
    crowd: null;
    crowdMovement: null;
    setLocation: SetLocationAsset;
    weather: null;
    videoClip: null;
    photo: null;
}

export interface VFXController {
    id: number;
    eventId: number;
    controllerSequenceNumber: number;
    vfxId: number;
    animationSpeed: number;
    activationCue: number;
    endCue: number;
    looping: boolean;
    vfx: VFXAsset;
}

export interface CameraFilterController {
    id: number;
    eventId: number;
    controllerSequenceNumber: number;
    cameraFilterVariantId: number;
    cameraFilterValue: number;
    activationCue: number;
    endCue: number;
    stackNumber: number;
    cameraFilterVariant: CameraFilterVariant;
}

export interface MusicController {
    id: number;
    eventId: number;
    controllerSequenceNumber: number;
    songId: number | null;
    userSoundId: number | null;
    scoreId: number | null;
    activationCue: number;
    endCue: number;
    levelSoundVolume: number;
    score: null;
    song: SongAsset | null;
    userSound: UserSound | null;
}
