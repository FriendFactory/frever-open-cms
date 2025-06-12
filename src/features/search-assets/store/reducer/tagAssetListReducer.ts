import { Action } from "redux";

import { AppState } from "app-state";
import { AssetListParams } from "features/search-assets/services";
import { assetListPageSelector } from "./asset";

import {
    tagAssetListActionGroup,
    tagAssetListLoadedOkAction,
    tagAssetListLoadingAction,
    TagAssetNames,
    TagAsset
} from "../actions/tagAssetList";
import { Assets } from "config";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_TAG_ASSET_LIST_SIZE } from "urls";

export interface TagAssetListState {
    loading: boolean;
}

export const tagAssetListReducer = tagAssetListActionGroup.hashedReducer(
    ({ stage, params }) => tagAssetListKeySelector(stage, params),
    (state: TagAssetListState | undefined, action: Action): TagAssetListState => {
        if (!state) {
            state = { loading: false };
        }

        if (tagAssetListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (tagAssetListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false
            };
        }

        return state;
    }
);

export interface TagAssetListPageSelector extends PagingInfoSelectResult {
    loading: boolean;
    data?: TagAsset[];
}

export const tagAssetListPageSelector =
    (stage: string, params: AssetListParams & { assetType?: string[] }) =>
    (appState: AppState): TagAssetListPageSelector => {
        const { loading } = appState.tags[tagAssetListKeySelector(stage, params)] || {};
        const { assetType } = params;
        const assetsTypesList = assetType?.length
            ? typeof assetType === "string"
                ? [assetType]
                : assetType
            : Object.keys(Assets);

        const data = assetsTypesList.reduce<TagAsset[]>((acc, value) => {
            const assetName = value as TagAssetNames;
            const assetSelector = assetListPageSelector(stage, params, assetName);
            const assetData = assetSelector(appState)?.data?.map((value) => ({ ...value, assetType: assetName })) || [];
            acc.push(...assetData);
            return acc;
        }, []);

        const currentPage = Math.floor((params?.skip ?? 0) / DEFAULT_TAG_ASSET_LIST_SIZE) + 1;

        return {
            loading,
            data,
            currentPage,
            total: 6000,
            pageSize: DEFAULT_TAG_ASSET_LIST_SIZE
        };
    };

export const tagAssetListKeySelector = (stage: string, { skip, ...params }: AssetListParams): string =>
    `${stage}/${params.tagId}`;
