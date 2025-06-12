import { LevelType, Video } from "features/video-moderation";

export const getVideoEditorType = (video: Video) =>
    !video.levelId
        ? "Uploaded"
        : video.levelTypeId === LevelType.Studio
        ? "Studio"
        : video.levelTypeId === LevelType.Moments
        ? "Moments"
        : "Unknown";
