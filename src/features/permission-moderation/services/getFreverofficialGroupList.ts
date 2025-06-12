import qs from "qs";
import { request } from "shared";

export interface FreverofficialGroup {
    id: number;
    nickName: string;
    isOfficial: boolean;
}

export async function getFreverofficialGroupList(stage: string): Promise<FreverofficialGroup[]> {
    const query: any = {};
    query.$filter = `isOfficial eq true`;

    const response = await request(stage)
        .assetmanager()
        .get(`api/group?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error("Error requesting to get group entity");
}
