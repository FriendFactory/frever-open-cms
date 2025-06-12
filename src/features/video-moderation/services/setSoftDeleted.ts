import { AxiosResponse } from "axios";
import { request } from "shared";
import { VideoInfo } from "./getVideoDetails";

export interface SetSoftDeleted {
    isDeleted: boolean;
}

export async function setSoftDeletedVideo(
    stage: string,
    videoId: number,
    isDeleted: boolean,
    includeRemixes: boolean
): Promise<VideoInfo> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .put<SetSoftDeleted, AxiosResponse<VideoInfo>>(`api/video/moderation/${videoId}/soft-delete`, {
            isDeleted,
            includeRemixes
        });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
