import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { CharacterFilterFormParams, CharacterListFilterForm } from "../components/CharacterListFilterForm";
import { GetCharacterListParams } from "../services";
import { dateToForm, dateToUrl } from "utils";

export interface CharacterFilterContainerProps {
    url: UrlPath<{ stage: string }, GetCharacterListParams>;
}

export function CharacterFilterContainer({ url }: CharacterFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<CharacterFilterFormParams>();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const onSearch = async () => {
        const formParams = await form.validateFields();
        const params = toCharacterUrlParams(formParams);

        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };
    const values = toCharacterFormValues(urlMatch.query || {});

    return <CharacterListFilterForm form={form} values={values} onSearch={onSearch} />;
}

export const toCharacterFormValues = (params: GetCharacterListParams): CharacterFilterFormParams => ({
    ...params,
    filter: params.name ? params.filter : "contains",
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined,
    modifiedTime: params.modifiedTime ? dateToForm(params.modifiedTime) : undefined
});

export const toCharacterUrlParams = (form: CharacterFilterFormParams): GetCharacterListParams => ({
    ...form,
    filter: form.name ? form.filter : "contains",
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToUrl(form.modifiedTime) : undefined
});
