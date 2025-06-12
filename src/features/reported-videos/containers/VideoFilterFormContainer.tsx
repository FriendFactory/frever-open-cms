import React from "react";
import { useHistory, useLocation } from "react-router";

import { FilterForm, FilterFormFields } from "../components/FilterForm";
import { GetReportedVideoListParams } from "../services";
import { REPORTED_VIDEO_LIST_URL } from "urls";
import { dateToForm, dateToUrl } from "utils";

export const FilterFormContainer = () => {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = REPORTED_VIDEO_LIST_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const handleChange = (form: FilterFormFields) => {
        const params = toUrlParams(form);

        const newUrl = REPORTED_VIDEO_LIST_URL.replace(
            location,
            {},
            {
                ...params,
                skip: 0
            }
        );

        if (newUrl) history.push(newUrl);
    };

    const values = toFormValues(urlMatch.query || {});

    return <FilterForm value={values} onChange={handleChange} />;
};

const toFormValues = (params: GetReportedVideoListParams): FilterFormFields => ({
    ...params,
    date: params.date ? dateToForm(params.date) : undefined
});

const toUrlParams = (form: FilterFormFields): GetReportedVideoListParams => ({
    ...form,
    date: form.date ? dateToUrl(form.date) : undefined
});
