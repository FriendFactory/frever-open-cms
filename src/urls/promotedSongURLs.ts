import { BASE_PAGE_URL } from "urls";
import { PromotedSongListQueryParams } from "features/promoted-songs/services";

export const PROMOTED_SONG_BASE_URL = BASE_PAGE_URL.createChildPath("promoted-song");

export const PROMOTED_SONG_LIST_URL = PROMOTED_SONG_BASE_URL.createChildPath<{}, PromotedSongListQueryParams>("list");

export const DEFAULT_PROMOTED_SONG_LIST_SIZE = 100;
