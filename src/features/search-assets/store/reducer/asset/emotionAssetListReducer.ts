import { Action } from "redux";
import qs from "query-string";

import { pageKeySelector } from "utils";
import { AppState } from "app-state";
import { assetKeySelector, extractAssetFromKey } from "./asset.reducer";
import { AssetListParams, EmotionAsset, EmotionAssetName } from "features/search-assets/services";
import {
    emotionAssetListActionGroup,
    emotionAssetListLoadingAction,
    emotionAssetListLoadedOkAction
} from "../../actions";
import { EmotionAssetInfo } from "features/search-assets/containers/EmotionAssetList/EmotionAssetListContainer";
import { DEFAULT_ASSETS_PAGE_SIZE } from "urls";

export interface EmotionAssetListState {
    loading: boolean;
    error?: string;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const emotionAssetListReducer = emotionAssetListActionGroup.hashedReducer(
    (props) => emotionAssetListKeySelector(props.stage, props.emotionId, props.params),
    (state: EmotionAssetListState | undefined, action: Action): EmotionAssetListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (emotionAssetListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (emotionAssetListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip, action.params.take)]: action.result
                        .map((el) => el.data.map((info) => assetKeySelector(action.stage, el.assetType, info.id)))
                        .flat()
                }
            };
        }

        return state;
    }
);

export const emotionAssetListKeySelector = (stage: string, emotionId: string, params: AssetListParams) => {
    const { skip, take, ...keyParams } = params || {};

    return `${stage}/id:${emotionId}/${qs.stringify(keyParams)}`.toLowerCase();
};

export interface EmotionAssetListPageResult {
    loading: boolean;
    skip: number;
    take: number;
    error?: string;
    data?: EmotionAssetInfo[];
}

export function emotionAssetListPageSelector(stage: string, emotionId: string, params: AssetListParams) {
    return (appState: AppState): EmotionAssetListPageResult => {
        const assetListState = appState.asset.emotionsAssetList[emotionAssetListKeySelector(stage, emotionId, params)];
        const page = assetListState?.pages?.[pageKeySelector(params.skip, params.take)] || [];

        const data = page.map(<T extends EmotionAssetName = EmotionAssetName>(key: string) => ({
            asset: extractAssetFromKey(key) as T,
            entity: appState.asset.entities[key] as EmotionAsset<T>
        }));

        return {
            error: assetListState?.error,
            loading: assetListState?.loading ?? false,
            data,
            skip: params.skip ?? 0,
            take: params.take ?? DEFAULT_ASSETS_PAGE_SIZE
        };
    };
}
