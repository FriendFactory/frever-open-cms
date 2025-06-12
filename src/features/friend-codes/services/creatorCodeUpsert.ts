import { request } from "shared";
import { StarCreatorCode } from "./api";

export async function creatorCodeUpsert(stage: string, data: StarCreatorCode): Promise<StarCreatorCode> {
    const response = await request(stage).assetmanager().post<StarCreatorCode>(`api/creator-code`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
