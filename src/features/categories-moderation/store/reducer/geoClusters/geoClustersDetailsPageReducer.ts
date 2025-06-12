import { Action } from "redux";

import {
    geoClustersDetailsActionGroup,
    geoClustersDetailsLoadingAction,
    geoClustersDetailsLoadedOkAction,
    geoClustersDetailsLoadedErrorAction
} from "../../actions/geoClustersDetails";
import { creatorGeoClusterKeySelector } from "./geoClustersEntitiesReducer";
import { GeoCluster } from "features/categories-moderation/services";
import { AppState } from "app-state";

export interface GeoClusterDetailsState {
    loading: boolean;
    error?: string;
    data?: GeoCluster;
}

export const geoClustersDetailsPageReducer = geoClustersDetailsActionGroup.hashedReducer(
    (props) => creatorGeoClusterKeySelector(props.stage, props.id),
    (state: GeoClusterDetailsState | undefined, action: Action): GeoClusterDetailsState => {
        if (!state) {
            state = { loading: false };
        }

        if (geoClustersDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (geoClustersDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (geoClustersDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export function geoClustersDetailsPageSelector(
    stage: string,
    id: number
): (appState: AppState) => GeoClusterDetailsState {
    return (appState) => {
        const key = creatorGeoClusterKeySelector(stage, id);

        const state = appState.geoClusters.detailsPage[key];

        const data = appState.geoClusters.entities[key];

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data
        };
    };
}
