import { BASE_PAGE_URL } from "urls";
import { PlaylistsQueryParams } from "features/external-music/services";

export const PLAYLISTS_BASE_URL = BASE_PAGE_URL.createChildPath("external-music");

export const PLAYLISTS_PAGE_URL = PLAYLISTS_BASE_URL.createChildPath<{}, PlaylistsQueryParams>("playlists");

export const PLAYLIST_DETAILS_PAGE_URL = PLAYLISTS_BASE_URL.createChildPath<{ id: number }, {}>("playlist/:id");

export const DEFAULT_PLAYLISTS_PAGE_SIZE = 20;
