import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { GeoClusterSearchFilter } from "features/categories-moderation/components/GeoClusterSearchFilter";
import { GEO_CLUSTERS_LIST_URL } from "urls";
import { GeoClustersListQueryParams } from "features/categories-moderation/services";

export function GeoClusterSearchFilterContainer() {
    const [form] = Form.useForm<GeoClustersListQueryParams>();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = GEO_CLUSTERS_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = GEO_CLUSTERS_LIST_URL.replace(location, {}, params);
        if (newUrl) history.push(newUrl);
    };

    return <GeoClusterSearchFilter form={form} values={urlMatch.query} onSearch={handleOnSearch} />;
}
