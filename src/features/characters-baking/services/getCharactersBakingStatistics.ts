import qs from "qs";

import { request } from "shared/request";
import { CharacterBakedViewStatistics } from "./api";

export interface CharactersBakingQueryParams {
    agentName?: string;
    startDate?: string;
    endDate?: string;
}

export const getCharactersBakingStatistics = async (
    stage: string,
    params: CharactersBakingQueryParams
): Promise<CharacterBakedViewStatistics> => {
    const query: any = {
        agentName: params.agentName,
        startDate: params.startDate,
        endDate: params.endDate
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/baking/statistics?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
