import { request } from "shared";
import { Watermark } from "./api";

export async function postWatermark(stage: string, data: Partial<Watermark>): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/watermark/moderation`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
