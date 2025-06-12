import { defineAction } from "rd-redux-utils";

import { AssetFile } from "features/search-assets/containers/CreateAsset/CreateAssetContainer";
import { AssetTypes } from "config";

export const createAssetAction = defineAction<{
    stage: string;
    asset: AssetTypes;
    data: FormData;
    files: AssetFile[];
    imageFiles: AssetFile[];
}>("CREATE ASSET");
