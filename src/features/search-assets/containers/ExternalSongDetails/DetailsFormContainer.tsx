import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { extSongDetailsSelector } from "features/search-assets/store/reducer/externalSong/externalSongDetails.reducer";
import { EXTERNAL_SONG_DETAILS_URL } from "urls";
import { ExternalSong } from "features/search-assets/services";
import { externalSongEditAction } from "features/search-assets/store";
import { DetailsForm } from "../../components/ExternalSong/DetailsForm";

export function DetailsFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = EXTERNAL_SONG_DETAILS_URL.match(location, true);

    if (!urlMatch.isMatched) return <div></div>;

    const { data, loading } = useSelector(extSongDetailsSelector(urlMatch.params.stage, urlMatch.params.id));

    const handleOnSubmit = (data: Partial<ExternalSong>) => {
        if ("challengeSortOrder" in data) {
            data.challengeSortOrder = null;
        }
        dispatch(
            externalSongEditAction({
                stage: urlMatch.params.stage,
                id: urlMatch.params.id,
                data
            })
        );
    };

    return <DetailsForm data={data} loading={!data && loading} handleOnSubmit={handleOnSubmit} />;
}
