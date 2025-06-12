import qs from "query-string";

import { request, ResultWithCount } from "shared";
import { InAppPriceTier } from "./api";

export const getInAppPriceTiers = async (stage: string): Promise<ResultWithCount<InAppPriceTier>> => {
    const query = {
        $orderBy: "id desc"
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/in-app-purchase/price-tiers?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
