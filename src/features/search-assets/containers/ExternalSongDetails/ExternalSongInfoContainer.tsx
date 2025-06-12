import React from "react";
import { useSelector } from "react-redux";

import { extSongDetailsSelector } from "features/search-assets/store/reducer/externalSong/externalSongDetails.reducer";
import { EXTERNAL_SONG_DETAILS_URL } from "urls";
import { ExternalSongInfo } from "features/search-assets/components/ExternalSong/ExternalSongInfo";
import { useExtraData } from "shared";

export function ExternalSongInfoContainer() {
    const urlMatch = EXTERNAL_SONG_DETAILS_URL.match(location, true);
    if (!urlMatch.isMatched) return null;

    const { stage, id } = urlMatch.params;

    const countries = useExtraData({ stage, name: "Country" });
    const info = useSelector(extSongDetailsSelector(stage, id));

    return <ExternalSongInfo data={info.data} loading={info.loading} countries={countries} />;
}
