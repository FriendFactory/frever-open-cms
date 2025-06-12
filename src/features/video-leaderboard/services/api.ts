import { Video } from "features/video-moderation/services";

export interface LeaderboardVideo extends Omit<Video, "kpi"> {
    kpi: {
        engagementRate: number;
        videoId: number;
        likes: number;
        views: number;
        comments: number;
        shares: number;
        remixes: number;
        battlesWon: number;
        battlesLost: number;
    };
}
