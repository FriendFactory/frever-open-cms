import { request } from "shared";

export async function deleteHashtag(stage: string, id: number) {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage).assetmanager().delete(`api/hashtag/moderation/${id}`);

    if (response.status === 204) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
}
