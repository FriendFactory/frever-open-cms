import { request } from "shared";
import { Video } from ".";

export enum VideoAccess {
    Public,
    ForFriends,
    ForFollowers,
    Private,
    ForTaggedGroups
}

export const videoAccess = [
    { id: 0, name: "Public" },
    { id: 1, name: "For Friends" },
    { id: 2, name: "For Followers" },
    { id: 3, name: "Private" },
    { id: 4, name: "For Tagged Groups" }
] as const;

export type VideoCommandType = "hide-video" | "hide-video-and-remixes" | "show-video";

export const VideoCommandInfo: Array<{
    command: VideoCommandType;
    url: (report: Video) => string;
    isAvailable: (report: Video) => boolean;
}> = [
    {
        command: "hide-video",
        url: (video) => `api/video/moderation/unpublish/${video.id}?includeRemixes=false`,
        isAvailable: (video) => video.access === VideoAccess.Public
    },
    {
        command: "hide-video-and-remixes",
        url: (video) => `api/video/moderation/unpublish/${video.id}/?includeRemixes=true`,
        isAvailable: (video) => video.access === VideoAccess.Public
    },
    {
        command: "show-video",
        url: (video) => `api/video/moderation/publish/${video.id}`,
        isAvailable: (video) => video.access !== VideoAccess.Public
    }
];

export async function executeVideoCommand(stage: string, video: Video, command: VideoCommandType): Promise<undefined> {
    if (!video) throw new Error("Video info is not provided");

    const commandInfo = VideoCommandInfo.find((c) => c.command === command);
    if (!commandInfo) throw new Error("Unknown command");

    const isAvailable = commandInfo.isAvailable(video);
    if (!isAvailable) throw new Error("Command is not available for current video");

    const url = commandInfo.url(video);

    const response = await request(stage).assetmanager().post(url);
    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}.`);
}

export const checkIsVideoFeatured = (video: Video) => video.toplistPosition === 1;
