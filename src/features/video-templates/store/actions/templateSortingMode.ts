import { defineAction } from "rd-redux-utils";

import { SortOrderTypes, Template } from "features/video-templates/services";
import { SortOrderModeParams } from "features/video-templates/services/helpers/createTemplateSortingModeQuery";

export const templateSortingModeLoadAction = defineAction<{
    stage: string;
    sortOrderType: SortOrderTypes;
    params: SortOrderModeParams;
}>("LOAD TEMPLATE SORTING LIST");

export const templateSortingModeLoadingAction = defineAction("TEMPLATE SORTING LIST LOADING");

export const templateSortingModeLoadedOkAction = defineAction<{
    stage: string;
    result: Template[];
    withValueCount?: number;
    withValueLoadedCount: number;
    restCount?: number;
    restLoadedCount: number;
}>("TEMPLATE SORTING LIST RESPONSE OK");

export const templateSortingModeLoadedErrorAction = defineAction<{ error: string }>(
    "TEMPLATE SORTING LIST RESPONSE ERROR"
);

export const templateSortingClearUpAction = defineAction("CLEAR UP SORTING TEMPLATE LIST");

export const updateSortingOrderAction = defineAction<{
    stage: string;
    data: Template[];
}>("UPDATE TEMPLATE SORTING ORDER");
