import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { TemplateFilterFormParams, TemplateListFilterForm } from "features/video-templates/components/TemplateList";
import { TemplateFilterParams } from "features/video-templates/services";
import { useExtraData } from "shared/hooks/useExtraData";
import { dateToForm, dateToUrl } from "utils";

export interface TemplFilterContainerProps {
    url: UrlPath<{ stage: string }, TemplateFilterParams>;
}

export function TemplFilterContainer({ url }: TemplFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const templateCategory = useExtraData({ stage: urlMatch.params.stage, name: "TemplateCategory" });

    const handleChange = (form: TemplateFilterFormParams) => {
        const params = toUrlParams(form);
        const newUrl = url.replace(location, {}, params);
        if (newUrl) history.push(newUrl);
    };

    const values = toFormValues(urlMatch.query || {});

    if (urlMatch.query?.sortOrderType || templateCategory.loading) return <div></div>;
    return (
        <TemplateListFilterForm
            stage={urlMatch.params.stage}
            values={values}
            templateCategories={templateCategory.data ?? []}
            onChange={handleChange}
        />
    );
}

export const toFormValues = (params: TemplateFilterParams): TemplateFilterFormParams => ({
    ...params,
    filter: params.filter ? params.filter : "contains",
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined,
    modifiedTime: params.modifiedTime ? dateToForm(params.modifiedTime) : undefined
});

export const toUrlParams = (form: TemplateFilterFormParams): TemplateFilterParams => ({
    ...form,
    filter: form.filter ? form.filter : "contains",
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToUrl(form.modifiedTime) : undefined
});
