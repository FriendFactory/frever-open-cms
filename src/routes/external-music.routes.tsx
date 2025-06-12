import React from "react";
import { Route } from "react-router";

import { PLAYLISTS_PAGE_URL, PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { PlaylistDetailsPage, PlaylistsPage } from "pages";
import { renderProtectedPageElement } from "shared";

export const ExternalMusicRoutes = [
    <Route
        key="playlist-details-page"
        path={PLAYLIST_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", PlaylistDetailsPage)}
    />,
    <Route
        key="playlists-page"
        path={PLAYLISTS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", PlaylistsPage)}
    />
];
