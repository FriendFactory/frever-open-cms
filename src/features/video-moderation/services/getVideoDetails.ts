import { request } from "shared";
import type { Video, VideoMediaInfo } from "./api";

export interface VideoInfo {
    video: Video;
    media?: VideoMediaInfo;
    remixes?: Video[];
}

export async function getVideoDetails(stage: string, videoId: number): Promise<VideoInfo> {
    const response = await request(stage).assetmanager().get<VideoInfo>(`api/video/moderation/${videoId}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
