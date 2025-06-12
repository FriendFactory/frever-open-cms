import { Action } from "redux";

import {
    geoClustersListActionGroup,
    geoClustersListLoadingAction,
    geoClustersListLoadedOkAction,
    geoClustersListLoadedErrorAction
} from "../../actions/geoClustersList";
import { creatorGeoClusterKeySelector } from "./geoClustersEntitiesReducer";
import { hashKeySelector, pageKeySelector } from "utils";
import { GeoCluster, GeoClustersListQueryParams } from "features/categories-moderation/services";
import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { GEO_CLUSTER_LIST_DEFAULT_SIZE } from "urls";

export interface GeoClustersListState {
    loading: boolean;
    error?: string;
    total?: number;
    pages: {
        [pageKey: string]: string[];
    };
}

const initialState = {
    loading: false,
    pages: {}
};

export const geoClustersListPageReducer = geoClustersListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: GeoClustersListState | undefined, action: Action): GeoClustersListState => {
        if (!state) {
            state = initialState;
        }

        if (geoClustersListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (geoClustersListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (geoClustersListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        creatorGeoClusterKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface GeoClustersListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    data?: GeoCluster[];
    error?: string;
}

export function geoClustersListPageSelector(
    stage: string,
    params: GeoClustersListQueryParams,
    withData?: boolean
): (appState: AppState) => GeoClustersListPageResult {
    return (appState) => {
        const state = appState.geoClusters.listPages[hashKeySelector(stage, params)];

        let data;

        if (withData) {
            data = state?.pages?.[pageKeySelector(params.skip)]
                ?.map((el) => appState.geoClusters.entities[el]!)
                .filter(Boolean);
        }

        const pageSize = params.take ?? GEO_CLUSTER_LIST_DEFAULT_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data,
            currentPage,
            pageSize,
            total: state?.total ?? 0
        };
    };
}
