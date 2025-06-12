import { Action } from "redux";

import { GeoCluster } from "../../../";
import { geoClustersListLoadedOkAction } from "../../actions/geoClustersList";
import { geoClustersDetailsLoadedOkAction, updateGeoClusterFinishedOkAction } from "../../actions/geoClustersDetails";

export interface GeoClustersEntitiesState {
    [x: string]: GeoCluster | undefined;
}

const initialState = {};

export const geoClustersEntitiesReducer = (
    state: GeoClustersEntitiesState | undefined,
    action: Action
): GeoClustersEntitiesState => {
    if (!state) {
        state = initialState;
    }

    if (geoClustersListLoadedOkAction.is(action)) {
        return action.result.data.reduce<GeoClustersEntitiesState>(
            (acc, el) => {
                acc[creatorGeoClusterKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (geoClustersDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [creatorGeoClusterKeySelector(action.stage, action.id)]: action.result
        };
    }

    if (updateGeoClusterFinishedOkAction.is(action)) {
        const key = creatorGeoClusterKeySelector(action.stage, action.id);

        const updatedEntity = { ...state[key]!, ...action.data };

        return {
            ...state,
            [key]: updatedEntity
        };
    }

    return state;
};

export const creatorGeoClusterKeySelector = (stage: string, id: number) => `${stage}/geo-cluster/${id}`;
