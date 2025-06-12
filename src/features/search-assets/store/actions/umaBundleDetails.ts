import { defineAction, defineActionGroup } from "rd-redux-utils";

import { UmaBundle } from "features/search-assets/services";
import { AssetFormData } from "shared/services/api";

export const umaBundleDetailsActionGroup = defineActionGroup<{
    stage: string;
    id: number;
}>("UMA BUNDLE DETAILS");

export const umaBundleDetailsLoadingAction = umaBundleDetailsActionGroup.defineAction("LOADING");

export const umaBundleDetailsLoadedOkAction = umaBundleDetailsActionGroup.defineAction<{
    result: UmaBundle;
}>("LOADED OK");

export const umaBundleDetailsLoadedErrorAction = umaBundleDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const deleteUmaAssetFileAction = defineAction<{ stage: string; umaBundleId: number; umaAssetFileId: number }>(
    "DELETE UMA ASSET FILE"
);

export const deleteUmaBundleAction = defineAction<{ stage: string; id: number }>("DELETE UMA BUNDLE");

export const editUmaAssetAction = defineAction<{
    stage: string;
    data: AssetFormData;
}>("EDIT UMA ASSET WARDROBE");

