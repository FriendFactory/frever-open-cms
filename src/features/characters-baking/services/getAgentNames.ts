import qs from "qs";

import { request } from "shared/request";

export interface GetAgentNamesQueryParams {
    skip?: number;
    take?: number;
}

export const getAgentNames = async (stage: string, params: GetAgentNamesQueryParams): Promise<string[]> => {
    const query: any = {
        spip: params.skip,
        take: params.take
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/baking/agent?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
