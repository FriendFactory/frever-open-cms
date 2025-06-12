import React from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { ApiOutlined, DatabaseOutlined, SearchOutlined } from "@ant-design/icons";
import { UrlPath } from "rd-url-utils";

import { PageHeader } from "shared/components/PageHeader";
import { Assets, AssetTypes } from "config";
import { ASSETS_BATCH_MODE_URL, BODY_ANIMATION_LINKER_URL, SEARCH_ASSET_URL } from "urls";
import { AssetListParams } from "features/search-assets/services";
import { AssetIpFilter } from "./AssetIpFilter";

export interface SearchPageTitleContainerProps {
    url: UrlPath<{ stage: string; asset: AssetTypes }, AssetListParams>;
    stage: string;
    asset: AssetTypes;
    params: AssetListParams;
    isBatchMode?: boolean;
}

export function SearchPageTitleContainer({ url, stage, asset, params, isBatchMode }: SearchPageTitleContainerProps) {
    const history = useHistory();

    const handleFilterIP = (newParams: AssetListParams) => {
        const newUrl = url.replace(location, {}, newParams);
        newUrl && history.push(newUrl);
    };

    return (
        <PageHeader
            title={Assets[asset as AssetTypes]?.title ?? "All Assets"}
            extra={
                <Space>
                    {isBatchMode ? (
                        <Button size="large" type="link">
                            <Link to={SEARCH_ASSET_URL.format({ stage, asset }, params)}>
                                Asset search <SearchOutlined />
                            </Link>
                        </Button>
                    ) : (
                        <Button size="large" type="link">
                            <Link to={ASSETS_BATCH_MODE_URL.format({ stage, asset }, params)}>
                                Batch mode <DatabaseOutlined />
                            </Link>
                        </Button>
                    )}
                    {asset === "BodyAnimation" && (
                        <Button size="large" type="link">
                            <Link
                                to={BODY_ANIMATION_LINKER_URL.format({
                                    stage
                                })}>
                                Linker <ApiOutlined />
                            </Link>
                        </Button>
                    )}
                </Space>
            }>
            <AssetIpFilter asset={asset} search={handleFilterIP} />
        </PageHeader>
    );
}
