import { request } from "shared";

export type VideosCommandByHashtag = "hide-videos" | "soft-delete-videos";

export async function executeVideoCommandByHashag(
    stage: string,
    command: VideosCommandByHashtag,
    body: { HashtagId: number; IncludeRemixes: boolean }
): Promise<undefined> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .post(
            command === "hide-videos"
                ? "api/video/moderation/unpublish-by-hashtag-id"
                : "api/video/moderation/soft-delete-by-hashtag-id",
            body
        );

    if (response.status === 204) {
        return;
    }

    throw new Error(`Status code: ${response.status}.`);
}
