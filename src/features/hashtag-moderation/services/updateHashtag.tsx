import { Store } from "antd/lib/form/interface";

import { request } from "shared";
import { Hashtag } from "./api";

export async function updateHashtag(stage: string, id: number, data: Store): Promise<Hashtag> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .patch(`api/hashtag/moderation/${id}`, data, { headers: { "Content-Type": "application/json" } });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
}
