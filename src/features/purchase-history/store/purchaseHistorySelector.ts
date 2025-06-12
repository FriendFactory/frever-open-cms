import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { calculateListTotal } from "shared/calculate-list-total";
import { DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE } from "urls";
import { InAppPurchaseOrder, UserPurchaseHistoryQueryParams } from "../services";

export function purchaseHistoryPagerSelector(
    stage: string,
    groupId: number,
    { skip, take }: UserPurchaseHistoryQueryParams
): (appState: AppState) => PagingInfoSelectResult {
    return (appState) => {
        const pageState = appState.purchaseHistory[purchaseHistoryKeySelector(stage, groupId)];
        const page = pageState?.pages[pageKeySelector(skip, take)];

        const pageSize = Number(take ?? DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE);
        const currentPage = Math.floor((skip ?? 0) / pageSize) + 1;
        const total = calculateListTotal(page?.length ?? 0, skip, pageSize);

        return {
            total,
            pageSize,
            currentPage
        };
    };
}

export interface PurchaseHistoryPageResult {
    error?: string;
    loading: boolean;
    stage: string;
    data?: InAppPurchaseOrder[];
}

export function purchaseHistoryPageSelector(
    stage: string,
    groupId: number,
    { skip, take }: UserPurchaseHistoryQueryParams
): (appState: AppState) => PurchaseHistoryPageResult {
    return (appState) => {
        const pageState = appState.purchaseHistory[purchaseHistoryKeySelector(stage, groupId)];
        const data = pageState?.pages[pageKeySelector(skip, take)];

        return {
            error: pageState?.error,
            loading: pageState?.loading ?? false,
            data,
            stage
        };
    };
}

export const purchaseHistoryKeySelector = (stage: string, groupId: number) => `stage=${stage}&groupId=${groupId}`;

export const pageKeySelector = (skip: number = 0, take: number = DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE) =>
    `skip=${skip}&take=${take}`;
