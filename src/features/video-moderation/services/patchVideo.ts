import { request } from "shared";

export interface VideoPatchRequest {
    startListItem?: number;
    isFeatured?: boolean;
    allowComment?: boolean;
    allowRemix?: boolean;
}

export async function patchVideo(stage: string, videoId: number, data: VideoPatchRequest): Promise<undefined> {
    const response = await request(stage).assetmanager().patch(`api/video/moderation/${videoId}`, data);
    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}.`);
}
