import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { SpawnFormationQueryParams } from "../services";
import { SpawnFormationListFilterForm } from "../components/SpawnFormationListFilterForm";
import { useExtraDataBundle } from "shared";

export interface SpawnFormationListFilterContainerProps {
    url: UrlPath<{ stage: string }, SpawnFormationQueryParams>;
}

export const SpawnFormationListFilterContainer = ({ url }: SpawnFormationListFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const extraBundle = useExtraDataBundle(["CharacterSpawnPositionFormationType"]);
    const [form] = useForm<SpawnFormationQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return (
        <SpawnFormationListFilterForm
            form={form}
            values={urlMatch.query || {}}
            onSearch={handleOnSearch}
            bundleData={extraBundle.bundle}
        />
    );
};
