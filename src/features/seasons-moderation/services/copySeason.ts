import { request } from "shared";
import { SeasonBaseInfo } from "./api";

export type CopySeasonType = Pick<SeasonBaseInfo, "id" | "startDate" | "endDate">;

export async function copySeason(stage: string, data: CopySeasonType): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/season/copy`, data);

    if (response.status === 200 || response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
