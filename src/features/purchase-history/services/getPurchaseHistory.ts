import { request } from "shared";
import { DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE } from "urls";
import { InAppPurchaseOrder } from "./api";

export interface UserPurchaseHistoryQueryParams {
    skip?: number;
    take?: number;
}

export const getUserPurchaseHistory = async (
    stage: string,
    groupId: number,
    params: UserPurchaseHistoryQueryParams
): Promise<InAppPurchaseOrder[]> => {
    const query = `$skip=${params.skip ?? 0}&$top=${params.take ?? DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE}`;

    const response = await request(stage)
        .assetmanager()
        .get(`api/in-app-purchase/purchase-history/${groupId}?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}. ${response.statusText || ""}`);
};
