import { AssetTypes } from "config";
import { BASE_PAGE_URL } from "urls";
import {
    AssetListParams,
    ExternalSongListQueryParams,
    UmaBudnleListQueryParams
} from "features/search-assets/services";

export interface BodyAnimationLinkerParams {
    bodyAnimSearch?: string;
    bodyAnimSkip?: number;
    charSpawnPosSearch?: string;
    charSpawnPosSkip?: number;

    selectedBodyAnim?: string;
    selectedCharaSpawnPos?: string;
}

export interface UmaBundleLinkerParams {
    baseBunId?: number;
    baseBunName?: string;
    baseBunSkip?: number;
    versionBunId?: number;
    versionBunName?: string;
    versionBunSkip?: number;
}

export const ASSET_BASE_URL = BASE_PAGE_URL.createChildPath<{ asset: AssetTypes }, {}>("assets/:asset");
export const SEARCH_ASSET_URL = ASSET_BASE_URL.createChildPath<{}, AssetListParams>("search");
export const DETAILS_ASSET_URL = ASSET_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const ASSETS_BATCH_MODE_URL = ASSET_BASE_URL.createChildPath<{}, AssetListParams>("batch-mode");

export const EXTERNAL_SONG_BASE_URL = BASE_PAGE_URL.createChildPath("external-song");
export const EXTERNAL_SONG_LIST_URL = EXTERNAL_SONG_BASE_URL.createChildPath<{}, ExternalSongListQueryParams>("list");
export const EXTERNAL_SONG_DETAILS_URL = EXTERNAL_SONG_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const UMA_BUNDLE_BASE_URL = BASE_PAGE_URL.createChildPath<{}, UmaBudnleListQueryParams>("uma-bundle");
export const UMA_BUNDLE_SEARCH_URL = UMA_BUNDLE_BASE_URL.createChildPath<{}, UmaBudnleListQueryParams>("list");
export const UMA_BUNDLE_DETAILS_URL = UMA_BUNDLE_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");
export const UMA_BUNDLE_LINKER_URL = UMA_BUNDLE_BASE_URL.createChildPath<{}, UmaBundleLinkerParams>("linker");

export const BODY_ANIMATION_LINKER_URL = BASE_PAGE_URL.createChildPath<{}, BodyAnimationLinkerParams>(
    "body-animation/linker"
);

export const DEFAULT_ASSETS_PAGE_SIZE = 50;
export const DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE = 50;
