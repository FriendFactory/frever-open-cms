import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import {
    ExternalSongFilterParams,
    ExternalSongListFilterForm
} from "features/search-assets/components/ExternalSong/ExternalSongListFilterForm";
import { ExternalSongListQueryParams } from "features/search-assets/services";
import { EXTERNAL_SONG_LIST_URL } from "urls";
import { useExtraData } from "shared";
import { dateToForm, dateToUrl } from "utils";

export function ExternalSongFilterContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = EXTERNAL_SONG_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const countries = useExtraData({ stage: urlMatch.params.stage, name: "Country" });

    const countriesOptions = countries.data?.map((el) => ({
        label: el.displayName,
        value: el.isoName
    }));

    const handleChange = useCallback(
        (form: ExternalSongFilterParams) => {
            const params = toTaskFormValues(form);
            const newUrl = EXTERNAL_SONG_LIST_URL.replace(
                location,
                {},
                {
                    ...params,
                    skip: undefined
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );
    const values = toTaskUrlParams(urlMatch.query || {});
    return <ExternalSongListFilterForm value={values} countriesOptions={countriesOptions} onChange={handleChange} />;
}

export const toTaskFormValues = (params: ExternalSongFilterParams): ExternalSongListQueryParams => ({
    ...params,
    licenseTime: params.licenseTime ? dateToUrl(params.licenseTime) : undefined
});

export const toTaskUrlParams = (form: ExternalSongListQueryParams): ExternalSongFilterParams => ({
    ...form,
    licenseTime: form.licenseTime ? dateToForm(form.licenseTime) : undefined
});
