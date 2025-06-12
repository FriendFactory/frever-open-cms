import { defineAction } from "rd-redux-utils";

import { AssetTypes } from "config";
import { AssetData } from "features/search-assets/services";

export const showAssetsDeleteModalAction =
    defineAction<{ assetToDeleteList: Array<AssetData[AssetTypes]> }>("SHOW ASSETS DELETE MODAL");

export const hideAssetsDeleteModalAction = defineAction("HIDE ASSETS DELETE MODAL");
