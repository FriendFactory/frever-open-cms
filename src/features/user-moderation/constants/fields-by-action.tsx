import React from "react";
import { Link } from "react-router-dom";

import { UserActionType, UserActivity } from "../services";
import {
    LEVEL_DETAILS_URL,
    SEASON_DETAILS_PAGE_URL,
    TASK_DETAILS_URL,
    USER_DETAILS_INFO_URL,
    VIDEO_MODERATION_DETAILS_URL
} from "urls";

export interface FieldByActionItemType {
    title: string;
    dataIndex?: keyof UserActivity;
    render?: (item: UserActivity, stage: string) => React.ReactNode;
}

const refVideoId: FieldByActionItemType = {
    title: "Video",
    dataIndex: "refVideoId",
    render: (record, stage) =>
        record.refVideoId && (
            <Link target="_blank" to={VIDEO_MODERATION_DETAILS_URL.format({ stage, id: record.refVideoId })}>
                {record.refVideoId}
            </Link>
        )
};

const seasonId: FieldByActionItemType = {
    title: "Season",
    dataIndex: "seasonId",
    render: (record, stage) =>
        record.seasonId && (
            <Link target="_blank" to={SEASON_DETAILS_PAGE_URL.format({ stage, id: record.seasonId })}>
                {record.seasonId}
            </Link>
        )
};

const xp: FieldByActionItemType = { title: "XP", dataIndex: "xp" };

const seasonLevelRewardId: FieldByActionItemType = { title: "Reward ID", dataIndex: "seasonLevelRewardId" };

const userLevel: FieldByActionItemType = { title: "User Level", dataIndex: "userLevel" };

const creatorLevelRewardId: FieldByActionItemType = {
    title: "Creator Level Reward",
    dataIndex: "creatorLevelRewardId"
};

const refTaskId: FieldByActionItemType = {
    title: "Task",
    dataIndex: "refTaskId",
    render: (record, stage) =>
        record.refTaskId && (
            <Link target="_blank" to={TASK_DETAILS_URL.format({ stage, id: record.refTaskId })}>
                {record.refTaskId}
            </Link>
        )
};

const refLevelId: FieldByActionItemType = {
    title: "Level",
    dataIndex: "refLevelId",
    render: (record, stage) =>
        record.refLevelId && (
            <Link target="_blank" to={LEVEL_DETAILS_URL.format({ stage, id: record.refLevelId })}>
                {record.refLevelId}
            </Link>
        )
};

const refActorGroupId: FieldByActionItemType = {
    title: "Actor ID",
    dataIndex: "refActorGroupId",
    render: (record, stage) =>
        record.refActorGroupId && (
            <Link
                target="_blank"
                to={USER_DETAILS_INFO_URL.format({ stage, selector: "mainGroupId", id: record.refActorGroupId })}>
                {record.refActorGroupId}
            </Link>
        )
};

const seasonQuestId: FieldByActionItemType = { title: "Quest", dataIndex: "seasonQuestId" };

const refGroupId: FieldByActionItemType = {
    title: "User",
    dataIndex: "refGroupId",
    render: (record, stage) =>
        record.refGroupId && (
            <Link
                target="_blank"
                to={USER_DETAILS_INFO_URL.format({ stage, selector: "mainGroupId", id: record.refGroupId })}>
                {record.refGroupId}
            </Link>
        )
};

const battleRewardId: FieldByActionItemType = { title: "Battle Reward Id", dataIndex: "battleRewardId" };

const streakLength: FieldByActionItemType = { title: "Streak Length", dataIndex: "streakLength" };

const fieldsByActionType: {
    [x: string]: FieldByActionItemType[];
} = {
    CreatorLevelRewardClaimed: [creatorLevelRewardId],
    LevelUpRewardClaimed: [seasonId, seasonLevelRewardId, userLevel],
    CompleteTask: [xp, refTaskId, refLevelId, seasonId],
    LikeReceived: [refVideoId, refActorGroupId, seasonId],
    SeasonQuestRewardClaimed: [xp, seasonId, seasonLevelRewardId, seasonQuestId],
    Login: [],
    InvitationCodeRewardClaimed: [refGroupId],
    BattleRewardClaimed: [refVideoId, refTaskId, battleRewardId],
    WatchVideo: [refVideoId],
    WatchVideoStreak: [refVideoId, streakLength],
    LikeVideo: [refVideoId],
    OriginalVideoCreated: [xp, refLevelId],
    TemplateVideoCreated: [],
    LikeVideoStreak: [],
    LoginStreak: [],
    OriginalVideoCreationStreak: [],
    LikeReceivedStreak: [],
    DailyQuestRewardClaimed: [],
    UpdateUserXp: [xp, seasonId],
    OnboardingRewardClaimed: [],
    CrewRewardClaimed: [],
    BattleResultReady: [],
    PurchaseSeasonLevel: [xp, seasonId],
    PublishedVideoShare: [refVideoId],
    VideoRaterRewardClaimed: [refLevelId],
    RatedVideoRewardClaimed: [refVideoId],
    RatingReceived: [refVideoId, refActorGroupId, seasonId]
};

export const getFieldsByActionType = (value: number) => fieldsByActionType[UserActionType[value]] ?? [];
