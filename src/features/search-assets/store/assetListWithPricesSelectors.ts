import { AppState } from "app-state";
import { PagingInfoSelectResult } from "../containers/AssetList/AssetListPagerContainer";
import { AssetDataNames, AssetData, AssetListParams, AssetOfferType } from "../services";
import { assetListPageSelector } from "./reducer";
import { AssetOfferByAssetResult, assetOfferByAssetSelector } from "./reducer/assetOffer/assetOfferByAsset.reducer";

export type AssetWithAssetOffer<T extends AssetDataNames = AssetDataNames> = AssetData[T] & {
    assetOffer?: AssetOfferByAssetResult;
};

export interface AssetListWithPricesPageResult<T extends AssetDataNames> extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: AssetWithAssetOffer<T>[];
    stage: string;
    params: AssetListParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export function assetListWithPricesPageSelector<T extends AssetDataNames>(
    stage: string,
    params: AssetListParams,
    asset: T
): (appState: AppState) => AssetListWithPricesPageResult<T> {
    return (appState) => {
        const info = assetListPageSelector(stage, params, asset)(appState);

        const result = {
            ...info,
            data: info.data?.map((el) => ({
                ...el,
                assetOffer: assetOfferByAssetSelector(stage, asset as AssetOfferType, el.id)(appState)
            }))
        };

        return result;
    };
}
