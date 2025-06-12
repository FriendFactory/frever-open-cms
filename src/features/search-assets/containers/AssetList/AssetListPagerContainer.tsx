import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { Divider, Pagination, Space } from "antd";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { AppState } from "app-state";
import { AssetDataNames } from "features/search-assets/services";
import { ASSETS_BATCH_MODE_URL } from "urls";

export interface PagingInfoSelectResult {
    total: number;
    pageSize: number;
    currentPage: number;
}

export interface AssetListPagerContainerProps<
    TParams extends { stage: string; asset: AssetDataNames },
    TQuery extends { skip?: number }
> {
    url: UrlPath<TParams, TQuery>;
    selectorFactory: (
        stage: string,
        query: TQuery,
        asset: AssetDataNames
    ) => (appState: AppState) => PagingInfoSelectResult;
    defaultPageSize: number;
}

export function AssetListPagerContainer<
    TParams extends { stage: string; asset: AssetDataNames },
    TQuery extends { skip?: number }
>({ url, selectorFactory, defaultPageSize }: AssetListPagerContainerProps<TParams, TQuery>) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const isWardrobeSearch = urlMatch.params.asset === "Wardrobe" && !ASSETS_BATCH_MODE_URL.match(location).isMatched;

    const handlePageChange = useCallback(
        (page: number, take: number) => {
            const newUrl = url.replace(location, {}, {
                skip: (page - 1) * (take ?? defaultPageSize),
                take: take ?? defaultPageSize
            } as any);

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location]
    );

    const info = useSelector(
        selectorFactory(urlMatch.params.stage, urlMatch.query || ({} as any), urlMatch.params.asset)
    );

    return (
        <Space split={<Divider type="vertical" />} align="center" style={{ marginTop: "24px" }} wrap={false}>
            <Pagination
                style={{ margin: 0 }}
                showQuickJumper={isWardrobeSearch}
                showSizeChanger
                total={info.total}
                pageSize={info.pageSize}
                current={info.currentPage}
                pageSizeOptions={[20, 50, 100, 200, 300, 400, 500, 1000, 1500]}
                onChange={handlePageChange}
            />
            {isWardrobeSearch ? `In total: ${info?.total}` : undefined}
        </Space>
    );
}
