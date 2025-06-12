import { defineAction, defineActionGroup } from "rd-redux-utils";

import { GeoCluster } from "../../";

export const geoClustersDetailsActionGroup = defineActionGroup<{
    stage: string;
    id: number;
}>("GEO CLUSTERS DETAILS");

export const geoClustersDetailsLoadingAction = geoClustersDetailsActionGroup.defineAction("LOADING");

export const geoClustersDetailsLoadedOkAction = geoClustersDetailsActionGroup.defineAction<{
    result: GeoCluster;
}>("LOADED OK");

export const geoClustersDetailsLoadedErrorAction = geoClustersDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const updateGeoClusterActionGroup =
    defineActionGroup<{ stage: string; id: number; data: Partial<GeoCluster> }>("UPDATE GEO CLUSTER");

export const executeUpdateGeoClusterAction = updateGeoClusterActionGroup.defineAction("EXECUTE");

export const updateGeoClusterFinishedOkAction = updateGeoClusterActionGroup.defineAction("FINISHED");

export const createGeoClusterAction =
    defineAction<{ stage: string; data: Partial<GeoCluster> }>("CREATE NEW GEO CLUSTER");
