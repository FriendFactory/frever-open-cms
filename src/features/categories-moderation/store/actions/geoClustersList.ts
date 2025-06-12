import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { GeoClustersListQueryParams, GeoCluster } from "../../";

export const geoClustersListActionGroup = defineActionGroup<{
    stage: string;
    params: GeoClustersListQueryParams;
}>("GEO CLUSTERS LIST");

export const geoClustersListLoadingAction = geoClustersListActionGroup.defineAction("LOADING");

export const geoClustersListLoadedOkAction = geoClustersListActionGroup.defineAction<{
    result: ResultWithCount<GeoCluster>;
}>("LOADED OK");

export const geoClustersListLoadedErrorAction = geoClustersListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
