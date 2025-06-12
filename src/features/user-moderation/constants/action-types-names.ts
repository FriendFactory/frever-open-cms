import { UserActionType } from "../services";

const actionTypeNames: { [x: string]: string } = {
    WatchVideo: "Watch Video",
    WatchVideoStreak: "Watch Video Streak",
    CompleteTask: "Complete Task",
    OriginalVideoCreated: "Original Video Created",
    TemplateVideoCreated: "Template Video Created",
    LikeVideo: "Like Video",
    LikeVideoStreak: "Like Video Streak",
    Login: "Login",
    LoginStreak: "Login Streak",
    OriginalVideoCreationStreak: "Original Video Creation Streak",
    LikeReceived: "Like Received",
    LikeReceivedStreak: "Like Received Streak",
    DailyQuestRewardClaimed: "Daily Quest Reward Claimed",
    LevelUpRewardClaimed: "Level Up Reward Claimed",
    SeasonQuestRewardClaimed: "Season Quest Reward Claimed",
    CreatorLevelRewardClaimed: "Creator Level Reward Claimed",
    BattleRewardClaimed: "Battle Reward Claimed",
    InvitationCodeRewardClaimed: "Invitation Code Reward Claimed",
    UpdateUserXp: "Update User XP",
    OnboardingRewardClaimed: "Onboarding Reward Claimed",
    CrewRewardClaimed: "Crew Reward Claimed",
    BattleResultReady: "BattleResult Ready",
    PurchaseSeasonLevel: "Purchase Season Level",
    PublishedVideoShare: "Published Video Share",
    VideoRaterRewardClaimed: "Video Rater Reward Claimed",
    RatedVideoRewardClaimed: "Rated VideoReward Claimed",
    RatingReceived: "Rating Received"
};

export const getActionTypeName = (key: number) => {
    const sourceName = UserActionType[key];
    return actionTypeNames[sourceName] ?? sourceName ?? key;
};
