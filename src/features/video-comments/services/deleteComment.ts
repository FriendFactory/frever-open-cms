import { request } from "shared";

export async function deleteComment(stage: string, videoId: number, commentId: number) {
    const response = await request(stage)
        .assetmanager()
        .delete(`api/video/moderation/${videoId}/comments/${commentId}`);

    if (response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
