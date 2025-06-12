import { Level } from "features/level-moderation/services";
import { WardrobeAsset } from "features/search-assets/services";
import { VideoClip } from "features/user-media/services/api";
import { ThumbnailFile } from "shared";

export interface UmaRecipe {
    id: number;
    globalId: string;
    j: string;
    umaRecipeAndWardrobe: Array<{ umaRecipeId: number; wardrobeId: number }>;
}

export interface Character {
    id: number;
    assetStoreInfoId: number;
    genderId: number;
    groupId: number;
    isDefault: boolean;
    isDeleted: boolean;
    name: string;
    characterAndUmaRecipe: Array<{
        characterId: number;
        umaRecipeId: number;
        umaRecipe: UmaRecipe;
    }>;
    publicForBackgroundDancing: boolean;
    publicForCreation: boolean;
    readinessId: number;
    characterStyleId: number;
    uploaderUserId: number;
    createdTime: string;
    modifiedTime: string;
    defaultOutfitId: string;
    sortOrder: number;
    files: Array<{
        version: string;
        file: number;
        extension: number;
        resolution: string;
    }>;
    version: string;
    isMainCharacter: boolean;
    availableForBakingSince: string;
}

export interface Outfit {
    id: number;
    groupId: number;
    readinessId?: number;
    tags: number[];
    outfitAndWardrobe: { outfitId: number; wardrobeId: number; wardrobe?: WardrobeAsset | null }[];
    createdTime?: string;
    sortOrder: number;
    files: ThumbnailFile[];
    modifiedTime: string;
    name: string | null;
    isDeleted: boolean;
    saveMethod: number;
    character: unknown[];
    characterController: unknown[];
    outfitAndUmaSharedColor: unknown[];
}

export interface Group {
    id: number;
    name: string;
    nickName: string;
    bio: string;
    isBlocked: boolean;
    isOnWatchList: boolean;
    isStarCreator: boolean;
    isStarCreatorCandidate: boolean;
    outfit?: Array<Outfit>;
    levelGroup?: Array<Level>;
    statusId: number | null;
    level: number | null;
    creatorScore: number;
    groupAndLevel: { groupId: number; levelId: number }[];
    deletedAt: string | null;
    toplistPosition: number | null;
    defaultLanguageId: number | null;
    taxationCountryId: number | null;
    isCommunityBuilder: boolean;
    birthDate: string | null;
    followerFollowing: Array<{
        followingId: number;
        followerId: number;
    }>;
    followerFollowerNavigation: Array<{
        followingId: number;
        followerId: number;
    }>;
}

export interface User {
    id: number;
    identityServerId: string;
    email: string | null;
    phoneNumber: string | null;
    mainGroupId: number;
    mainCharacterId: number;
    createdTime: string;
    character?: Array<Character>;
    videoClip?: Array<VideoClip>;
    mainCharacter?: Character;
    mainGroup: Group;
    isFeatured: boolean;
    creatorPermissionLevel: Array<number>;

    consentTime: null;
    appleId: string | null;
    googleId: string | null;

    artist: boolean;
    qauser: boolean;
    partner: boolean;
    moderator: boolean;
    dataCollection: boolean;
    analyticsEnabled: boolean;
    isEmployee: boolean;

    userProfileKPI?: UserProfileKPI;
}

export interface UserProfileKPI {
    followersCount: number;
    followingCount: number;
    videoLikesCount: number;
    publishedVideoCount: number;
    totalVideoCount: number;
    taggedInVideoCount: number;
    totalDraftsCount: number;
    totalLevelsCount: number;
    characterCount: number;
    levelCount: number;
    outfitCount: number;
    videoClipsCount: number;
    userSoundsCount: number;
    userPhotosCount: number;
    totalPurchases: number;
    hardCurrency: number;
    softCurrency: number;
    xpScore: number;
    activityScore: number;
}

export interface PurchasedAsset {
    id: number;
    name: string;
    purchaseDate: string;
    files: ThumbnailFile[];
    assetType: string;
}

export interface UserActivity {
    groupId: number;
    actionType: number;
    xp: number | null;
    refVideoId: number | null;
    refTaskId: number | null;
    refLevelId: number | null;
    refGroupId: number | null;
    streakLength: number | null;
    dailyQuestId: number | null;
    refActorGroupId: number | null;
    refRelatedUserActivityId: number | null;
    seasonId: number | null;
    userLevel: number | null;
    seasonLevelRewardId: number | null;
    seasonQuestId: number | null;
    creatorLevelRewardId: number | null;
    battleRewardId: number | null;
    occurredAt: string;
}

export const UserActionType: { [x: number]: string } = {
    1: "WatchVideo",
    10: "WatchVideoStreak",
    2: "CompleteTask",
    3: "OriginalVideoCreated",
    4: "TemplateVideoCreated",
    5: "LikeVideo",
    9: "LikeVideoStreak",
    6: "Login",
    7: "LoginStreak",
    8: "OriginalVideoCreationStreak",
    11: "LikeReceived",
    12: "LikeReceivedStreak",
    13: "DailyQuestRewardClaimed",
    14: "LevelUpRewardClaimed",
    15: "SeasonQuestRewardClaimed",
    16: "CreatorLevelRewardClaimed",
    17: "BattleRewardClaimed",
    18: "InvitationCodeRewardClaimed",
    19: "UpdateUserXp",
    20: "OnboardingRewardClaimed",
    21: "CrewRewardClaimed",
    22: "BattleResultReady",
    23: "PurchaseSeasonLevel",
    24: "PublishedVideoShare",
    25: "VideoRaterRewardClaimed",
    26: "RatedVideoRewardClaimed",
    27: "RatingReceived"
};
