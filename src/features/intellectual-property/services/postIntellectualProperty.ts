import { request } from "shared";
import { IntellectualProperty } from "./api";

export async function postIntellectualProperty(stage: string, data: Partial<IntellectualProperty>): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/intellectual-property/moderation`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
